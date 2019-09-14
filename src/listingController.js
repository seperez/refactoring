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

const selectQuery = () => {
  const select =  `
    SELECT
      "Subsidiary"."id" as "subsidiaryId",
      "Country"."name" as "countryName",
      "Country"."code" as "countryCode",
      COALESCE("Subsidiary"."name", "Company"."name") as "subsidiaryName",
      COALESCE("Subsidiary"."logo", "Company"."logo") as "subsidiaryLogo",
      "Listing"."id",
      "Listing".company_name as "companyName",
      "Listing".company_logo as "companyLogo",
      "Listing"."name",
      "Listing"."description",
      "Listing"."criteria",
      "Listing"."info",
      "Listing"."state",
      "Listing"."gs",
      COALESCE("PlatformListing".platform_listings, 0)::int as "platformListings"

      FROM
        listings AS "Listing"
        LEFT OUTER JOIN subsidiaries AS "Subsidiary" ON "Listing".subsidiary_id = "Subsidiary"."id"
        LEFT OUTER JOIN countries AS "Country" ON "Subsidiary".country_id = "Country"."id"
        LEFT OUTER JOIN companies AS "Company" ON "Subsidiary".company_id = "Company"."id"
      LEFT OUTER JOIN (
        SELECT l.listing_id as "lid", count(*) as platform_listings FROM platform_listings as l
        WHERE l."state" = 'ACTIVE'
      GROUP BY lid) AS "PlatformListing" ON "Listing"."id" = "PlatformListing"."lid"
    `
  return select
}

const selectStepsQuery = () => {
  const select = `
      SELECT
        "Step"."id",
        "Step"."name",
        "Step"."step",
        'FLOW' as "type",
        "Flow"."id" as "flowId",
        "Flow"."name" as "flowName"
      FROM
        steps as "Step"
        LEFT OUTER JOIN flows as "Flow" ON "Flow"."id" = "Step"."flow_id"
      WHERE
        "Step".listing_id = ?
  `
  return select
}

const getListings = () => {
  const requirements = {type: models.sequelize.QueryTypes.SELECT}
  let query = ""

  const select = selectQuery()

  const where = `
  WHERE
    "Listing"."id" = ?
  `
  requirements.replacements = [listing.id];
  query = select + where

  return models.sequelize.query(query, requirements)
  .then(sendResponse)
  .catch((error) => {
    console.log(error)
    res.status(400).send(error)
  });
};

const updateRemainingSteps = () => {
  // update the remaining steps
  models.sequelize.Promise.each(changes, function(val, index) {
    return StepModel.update(
      {
        name: val.name,
        step: val.step,
        flowId: val.flowId
      },{
        where:{
          id: val.id
        }
      })
  })
  .then(getListings)
  .catch((error) => {
    console.log(error)
    res.status(400).send(error)
  });
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
                .then(()=>{
                  const requirements = {type: models.sequelize.QueryTypes.SELECT}
                  let query = ""

                  const select = selectQuery()

                  const where = `
                  WHERE
                    "Listing"."id" = ?
                  `
                  requirements.replacements = [listing.id];
                  query = select + where

                  return models.sequelize.query(query, requirements)
                  .then()
                  .catch(send400GenericError);
                })
                .catch(send400GenericError);

              })
              .catch(send400GenericError);
            })
            .catch(send400GenericError);
          } else {
            // second, delete the steps to be deleted
            StepModel.destroy({
              where: {
                id: deleted
              }
            })
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