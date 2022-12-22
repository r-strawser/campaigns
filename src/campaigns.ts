import { BigInt } from "@graphprotocol/graph-ts"
import {
  Campaigns,
  CampaignCreated,
  Donated,
  PromotionSubmitted
} from "../generated/Campaigns/Campaigns"
import { 
  Campaign,
  Promotion,
  Donor
  } from "../generated/schema"

export function handleCampaignCreated(event: CampaignCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // load a compaign entity using the id format of the operator address followed by the campaign name
  let entity = Campaign.load(`${event.params.campaignID}`)

  // let entity = Campaign.load(event.transaction.hash.toHex())

  

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Campaign(`${event.params.campaignID}`)

    // Entity fields can be set using simple assignments
    entity.operatorAddress = event.params.operator.toHex()
    entity.treasuryAddress = event.params.treasury.toHex()
    entity.campaignName = event.params.campaignName
    entity.description = event.params.description
    entity.totalDonated = BigInt.fromI32(0)
    entity.targetGoal = event.params.targetGoal
    entity.isActive = false
    entity.timestampCreated = event.params.timestamp

    let contract = Campaigns.bind(event.address)
    entity.platformFeePercentage = contract.platformFeePercent()
    entity.campaignFeePercentage = contract.campaignFeePercent()
    entity.promotionPrice = contract.PROMOTION_PRICE()
    entity.minimumDonation = contract.MINIMUM_DONATION()
  }

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleDonated(event: Donated): void {


  // create a new donor entity
  let donor = new Donor(`${event.params.donor.toHex()}-${event.params.campaignID}-${event.params.timestamp}`)

  // set the donor entity fields
  donor.donorAddress = event.params.donor.toHex()
  donor.amount = event.params.amount
  donor.timestamp = event.params.timestamp
  donor.campaign = `${event.params.campaignID}`
  donor.campaignPointsEarned = event.params.pointsEarned

  // save the donor entity
  donor.save()

  // load the campaign entity
  let campaign = Campaign.load(`${event.params.campaignID}`)

  if(campaign) {
    // update the campaign entity's isActive field if it is set to false
    if(campaign.isActive == false) {
      campaign.isActive = true
    }

    // update the campaign entity's totalDonated field
    campaign.totalDonated = campaign.totalDonated.plus(event.params.amount)

    // save the campaign entity
    campaign.save()
  
  }
}

export function handlePromotionSubmitted(event: PromotionSubmitted): void {
  // handle the promotion submitted entity
  // store the Promotion id as `<promoterAddress>-<campaignId>-<timestamp>`
  let promotion = new Promotion(`${event.params.promoter.toHex()}-${event.params.campaignID}-${event.params.timestamp}`)
  
  // set the promotion entity fields
  promotion.campaign = `${event.params.campaignID}`
  promotion.promoterAddress = event.params.promoter.toHex()
  promotion.amountPaid = event.params.amountPaid
  promotion.promotionUrl = event.params.link
  promotion.timestamp = event.params.timestamp
  promotion.campaignPointsToClaim = event.params.points;

  // Save the promotion entity
  promotion.save()

  // load the campaign entity
  let campaign = Campaign.load(`${event.params.campaignID}`)

  if(campaign) {
    // update the campaign entity's isActive field if it is set to false
    if(campaign.isActive == false) {
      campaign.isActive = true
    }

    // update the campaign entity's totalDonated field to the specified amount from the campaignFeePercent
    campaign.totalDonated = campaign.totalDonated.plus(event.params.campaignFee)

    // save the campaign entity
    campaign.save()
  }
}
