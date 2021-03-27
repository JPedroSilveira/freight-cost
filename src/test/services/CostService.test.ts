import Cost from "../../types/Cost"
import { CostService } from "../../services"
import CostConstants from "../../constants/CostConstants"

jest.mock("../../storage/Database.ts")

test('save one item', async () => {
    const entity: Cost = {
        value: 50
    }

    await CostService.save(entity)

    const cost = await CostService.get()

    expect(cost).not.toBe(undefined)
    expect(cost?.id === entity.id).toBe(true)
    expect(cost?.value === entity.value).toBe(true)
})

test('save two itens', async () => {
    const entity: Cost = {
        value: 50
    }

    await CostService.save(entity)

    const cost = await CostService.get()

    expect(cost).not.toBe(undefined)
    expect(cost?.id === entity.id).toBe(true)
    expect(cost?.value === entity.value).toBe(true)

    const entity2: Cost = {
        value: 100
    }

    await CostService.save(entity2)

    const cost2 = await CostService.get()
    
    expect(cost2).not.toBe(undefined)
    expect(cost2?.id === entity2.id).toBe(true)
    expect(cost2?.value === entity2.value).toBe(true)
})

test('save three itens', async () => {
    const entity1: Cost = {
        value: 50
    }

    await CostService.save(entity1)

    const entity2: Cost = {
        value: 100
    }

    await CostService.save(entity2)

    const entity3: Cost = {
        value: 100
    }

    await CostService.save(entity3)

    const cost = await CostService.get()
    
    expect(cost).not.toBe(undefined)
    expect(cost?.id === entity3.id).toBe(true)
    expect(cost?.value === entity3.value).toBe(true)
})

test('isValid with valid entity return right value and message', async () => {
    const entity: Cost = {
        value: 100
    }

    const [isValid, message] = await CostService.isValid(entity)

    expect(isValid).toBe(true)
    expect(message).toBe('')
})

test('isValid with inValid entity return right value and message', async () => {
    const entity: Cost = {
        value: -20
    }

    const [isValid, message] = await CostService.isValid(entity)

    expect(isValid).toBe(false)
    expect(message).toBe(CostConstants.NEGATIVE_COST)
})

test('try save one item with negative value', async () => {
    const entity: Cost = {
        value: -1
    }

    await CostService.save(entity)

    const cost = await CostService.get()

    expect(entity.id).toBe(undefined)

    if (cost) expect(cost.value !== entity.value).toBe(true)
})

