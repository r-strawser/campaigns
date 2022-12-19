import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll
  } from "matchstick-as/assembly/index"
  import { BigInt, Address } from "@graphprotocol/graph-ts"
  import { ExampleEntity } from "../generated/schema"
  import { CampaignCreated } from "../generated/Campaigns/Campaigns"
  import { handleCampaignCreated } from "../src/campaigns"
  import { createCampaignCreatedEvent } from "./campaigns-utils"
  
  // Tests structure (matchstick-as >=0.5.0)
  // https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0
  
  describe("Describe entity assertions", () => {
    beforeAll(() => {
      let campaignID = BigInt.fromI32(234)
      let operator = Address.fromString(
        "0x0000000000000000000000000000000000000001"
      )
      let treasury = Address.fromString(
        "0x0000000000000000000000000000000000000001"
      )
      let campaignName = "Example string value"
      let description = "Example string value"
      let targetGoal = BigInt.fromI32(234)
      let timestamp = BigInt.fromI32(234)
      let newCampaignCreatedEvent = createCampaignCreatedEvent(
        campaignID,
        operator,
        treasury,
        campaignName,
        description,
        targetGoal,
        timestamp
      )
      handleCampaignCreated(newCampaignCreatedEvent)
    })
  
    afterAll(() => {
      clearStore()
    })
  
    // For more test scenarios, see:
    // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test
  
    test("ExampleEntity created and stored", () => {
      assert.entityCount("ExampleEntity", 1)
  
      // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "campaignID",
        "234"
      )
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "operator",
        "0x0000000000000000000000000000000000000001"
      )
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "treasury",
        "0x0000000000000000000000000000000000000001"
      )
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "campaignName",
        "Example string value"
      )
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "description",
        "Example string value"
      )
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "targetGoal",
        "234"
      )
      assert.fieldEquals(
        "ExampleEntity",
        "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
        "timestamp",
        "234"
      )
  
      // More assert options:
      // https://thegraph.com/docs/en/developer/matchstick/#asserts
    })
  })
  