const ListingModel  = require('../../db/models').Listing;

const selectQuery =  `
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

class ListingModelWrapper {
  static findAll (listingId) {
    const requirements = {type: models.sequelize.QueryTypes.SELECT}
    let query = ""  
    
    const where = `
    WHERE
      "Listing"."id" = ?
    `
    requirements.replacements = [listingId];
    query = selectQuery + where
  
    return models.sequelize.query(query, requirements)
  }
}

export default ListingModelWrapper;