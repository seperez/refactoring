const StepModel  = require('../../db/models').Step;
const models  = require('../../db/models');
const listingResponses = require('./listingResponses');
const StepModelWrapper = require('./StepModelWrapper');

const { 
  sendResponse, 
  send400GenericError, 
  send403Unauthorized, 
  send400IfUserNotFound, 
  send404IfListingsNotFound 
} =  listingResponses;

const updateRemainingSteps = (changes, listingId, listings, res) => {
  StepModelWrapper.multiUpdate(changes)
  .then(() => {
    ListingModelWrapper.findAll(listingId)
    .then(() => { sendResponse(listings, res) })
    .catch((error) => { send400GenericError(error, res) });
  })
  .catch((error) => { send400GenericError(error, res) });
};

const destoryStep = (deleted, changes, listingId, listings, res) {
  StepModelWrapper.destroy(deleted)
  .then(() => { updateRemainingSteps(changes, listingId, listings, res) })
  .catch((error) => { send400GenericError(error, res) });
};

module.exports = {
  update(req, res) {
    send400IfUserNotFound(req, res);
    
    const { listingId } = req.params; 
    const dataFromRequestBody = req.body;

    return  
    .findById(listingId)
    .then(listing => {
      send404IfListingsNotFound(listing, res);
      send403Unauthorized(listing, req, res);

      const dataToUpdate = Object.assign({}, dataFromRequestBody, listing);
      const { companyName, companyLogo, name, description, info, state, gs, criteria } = dataToUpdate;

      return listing
      .update({ companyName, companyLogo, name, description, info, state, gs, criteria })
      .then((listing) => {

        StepModelWrapper.findAll(listing.id)
        .then((steps) =>{
          const clientSteps = dataFromRequestBody.steps;
          let deleted = steps;
          const changes = clientSteps.filter( step => step.id > 0);
          const newSteps = clientSteps.filter( step => step.id < 0);
          for (let i=0, len = clientSteps.length; i < len; i++){
            deleted = deleted.filter( listingFlow => listingFlow.id !== clientSteps[i].id)
          }
          deleted = deleted.map(d => d.id)
          
          // first create the new steps
          const stepList = new StepList();
          stepList.createAndAddSteps(listing.id, newSteps);

          if (stepList.hasSteps())
            StepModelWrapper.bulkCreate(stepList.asJSON())
            .then(() => {
              destoryStep(deleted, changes, listing.id, listings, res);
            })
            .catch((error) => { send400GenericError(error, res) });
          } else {
            destoryStep(deleted, changes, listing.id, listings, res)
          }
        })
        .catch((error) => { send400GenericError(error, res) });
      })
      .catch((error) => { send400GenericError(error, res) });
    })
    .catch((error) => { send400GenericError(error, res) });
  },
};