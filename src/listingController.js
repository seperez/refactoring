const Listing  = require('../../db/models').Listing;
const models  = require('../../db/models');
const request = require('request')
const config   = require('../config/');
const utils = require('../../emi/utils')
const constants   = require('../config/constants');

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

module.exports = {

  update(req, res) {
    if (!req.decoded || !req.decoded.user){
      return res.status(400).send({
        message: 'User Not Found',
      });
    }

    return Listing
    .findById(req.params.listingId)
    .then(listing => {
      if (!listing) {
        return res.status(404).send({
          message: 'Listing Not Found',
        });
      }

      if (listing.subsidiaryId != req.decoded.user.subsidiaryId && !req.decoded.authorities.includes(constants.ROLE_EMPLOYEE) ) {
        return res.status(403).send({
          message: 'Listing Not Found',
        });
      }

      return listing
      .update({
        companyName: req.body.companyName || listing.companyName,
        companyLogo: req.body.companyLogo || listing.companyLogo,
        name: req.body.name || listing.name,
        description: req.body.description || listing.description,
        info: req.body.info || listing.info,
        state: req.body.state || listing.state,
        gs: req.body.gs || listing.gs,
        criteria: req.body.criteria || listing.criteria,
      })
      .then((listing) => {

        models.Step.findAll({
          where:{
              listingId: listing.id
          }
        })
        .then((steps) =>{

          const clientSteps = req.body.steps;
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
            models.Step.bulkCreate(bulkCreate)
            .then(() => {
              // second, delete the steps to be deleted
              models.Step.destroy({
                where: {
                  id: deleted
                }
              })
              .then(() => {
                // update the remaining steps
                models.sequelize.Promise.each(changes, function(val, index) {
                  return models.Step.update(
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
                  .then((listings) => res.status(200).send(listings[0]))
                  .catch((error) => {
                    console.log(error)
                    res.status(400).send(error)
                  });
                })
                .catch((error) => {
                  console.log(error)
                  res.status(400).send(error)
                });

              })
              .catch((error) => {
                console.log(error)
                res.status(400).send(error)
              });
            })
            .catch((error) => {
              console.log(error)
              res.status(400).send(error)
            });
          } else {
            // second, delete the steps to be deleted
            models.Step.destroy({
              where: {
                id: deleted
              }
            })
            .then(() => {
              // update the remaining steps
              models.sequelize.Promise.each(changes, function(val, index) {
                return models.Step.update(
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
                .then((listings) => res.status(200).send(listings[0]))
                .catch((error) => {
                  console.log(error)
                  res.status(400).send(error)
                });
              })
              .catch((error) => {
                console.log(error)
                res.status(400).send(error)
              });

            })
            .catch((error) => {
              console.log(error)
              res.status(400).send(error)
            });
          }

        })
        .catch((error) => {
          console.log(error)
          res.status(400).send(error)
        });

      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
  },

};