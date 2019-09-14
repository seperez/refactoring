const Listing  = require('../../db/models').Listing;
const StepModel  = require('../../db/models').Step;
const models  = require('../../db/models');
const request = require('request')
const config   = require('../config/');
const utils = require('../../emi/utils')
const constants   = require('../config/constants');
const listingResponses = require('./listingResponses');
const StepModelWrapper = require('./StepModelWrapper');

const { 
  sendResponse, 
  send400GenericError, 
  send403Unauthorized, 
  send400IfUserNotFound, 
  send404IfListingsNotFound 
} =  listingResponses;

const updateRemainingSteps = () => {
  StepModelWrapper.multiUpdate(changes)
  .then(() => {
    ListingModelWrapper.findAll(listingId)
    .then(sendResponse)
    .catch(send400GenericError);
  })
  .catch(send400GenericError);
}

module.exports = {

  update(req, res) {
    send404IfUserNotFound();

    const { listingId } = req.params; 
    const dataFromRequestBody = req.body;

    return  
    .findById(listingId)
    .then(listing => {
      send404IfListingsNotFound();
      send403Unauthorized();

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
          console.log("deleted", deleted)
          // first create the new steps
          const bulkCreate = []
          for (let i = 0, len = newSteps.length; i < len; i++) {
            if (newSteps[i].id < 0){
              bulkCreate.push({
                listingId: listing.id,
                 flowId: newSteps[i].flowId,
                name: newSteps[i].name,
                step: newSteps[i].step,
              })
            }

          }
          if (bulkCreate && bulkCreate.length > 0){
            StepModelWrapper.bulkCreate(bulkCreate)
            .then(() => {
              // second, delete the steps to be deleted
              StepModelWrapper.destroy(deleted)
              .then(() => {
                // update the remaining steps
                StepModelWrapper.multiUpdate(changes)
                .then(() => {
                  ListingModelWrapper.findAll(listingId)
                  .then(sendResponse)
                  .catch(send400GenericError);
                })
                .catch(send400GenericError);

              })
              .catch(send400GenericError);
            })
            .catch(send400GenericError);
          } else {
            // second, delete the steps to be deleted
            StepModelWrapper.destroy(deleted)
            .then(() => { updateRemainingSteps(changes) })
            .catch(send400GenericError);
          }
        })
        .catch(send400GenericError);
      })
      .catch(send400GenericError);
    })
    .catch(send400GenericError);
  },
};