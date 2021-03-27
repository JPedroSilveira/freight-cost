import Cost from "../../types/Cost"
import { CostService } from "../../services"

jest.mock("../../storage/Database.ts")

test('save one item', async () => {
    const entity: Cost = {
        valueInRS: 50
    }

    await CostService.save(entity)

    const cost = await CostService.get()

    expect(cost).not.toBe(undefined)
    expect(cost?.id === entity.id).toBe(true)
    expect(cost?.valueInRS === entity.valueInRS).toBe(true)
})

test('save two itens', async () => {
    const entity: Cost = {
        valueInRS: 50
    }

    await CostService.save(entity)

    const cost = await CostService.get()

    expect(cost).not.toBe(undefined)
    expect(cost?.id === entity.id).toBe(true)
    expect(cost?.valueInRS === entity.valueInRS).toBe(true)

    const entity2: Cost = {
        valueInRS: 100
    }

    await CostService.save(entity2)

    const cost2 = await CostService.get()
    
    expect(cost2).not.toBe(undefined)
    expect(cost2?.id === entity2.id).toBe(true)
    expect(cost2?.valueInRS === entity2.valueInRS).toBe(true)
})

test('save three itens', async () => {
    const entity1: Cost = {
        valueInRS: 50
    }

    await CostService.save(entity1)

    const entity2: Cost = {
        valueInRS: 100
    }

    await CostService.save(entity2)

    const entity3: Cost = {
        valueInRS: 100
    }

    await CostService.save(entity3)

    const cost = await CostService.get()
    
    expect(cost).not.toBe(undefined)
    expect(cost?.id === entity3.id).toBe(true)
    expect(cost?.valueInRS === entity3.valueInRS).toBe(true)
})