import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CampaignCreated,
  Donated,
  PromotionSubmitted
} from "../generated/Campaigns/Campaigns"

export function createCampaignCreatedEvent(
  campaignID: BigInt,
  operator: Address,
  treasury: Address,
  campaignName: string,
  description: string,
  targetGoal: BigInt,
  timestamp: BigInt
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignID",
      ethereum.Value.fromUnsignedBigInt(campaignID)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignName",
      ethereum.Value.fromString(campaignName)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "targetGoal",
      ethereum.Value.fromUnsignedBigInt(targetGoal)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return campaignCreatedEvent
}

export function createDonatedEvent(
  campaignID: BigInt,
  donor: Address,
  amount: BigInt,
  timestamp: BigInt
): Donated {
  let donatedEvent = changetype<Donated>(newMockEvent())

  donatedEvent.parameters = new Array()

  donatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignID",
      ethereum.Value.fromUnsignedBigInt(campaignID)
    )
  )
  donatedEvent.parameters.push(
    new ethereum.EventParam("donor", ethereum.Value.fromAddress(donor))
  )
  donatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  donatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return donatedEvent
}

export function createPromotionSubmittedEvent(
  campaignID: BigInt,
  promoter: Address,
  amountPaid: BigInt,
  link: string,
  timestamp: BigInt
): PromotionSubmitted {
  let promotionSubmittedEvent = changetype<PromotionSubmitted>(newMockEvent())

  promotionSubmittedEvent.parameters = new Array()

  promotionSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignID",
      ethereum.Value.fromUnsignedBigInt(campaignID)
    )
  )
  promotionSubmittedEvent.parameters.push(
    new ethereum.EventParam("promoter", ethereum.Value.fromAddress(promoter))
  )
  promotionSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "amountPaid",
      ethereum.Value.fromUnsignedBigInt(amountPaid)
    )
  )
  promotionSubmittedEvent.parameters.push(
    new ethereum.EventParam("link", ethereum.Value.fromString(link))
  )
  promotionSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return promotionSubmittedEvent
}
