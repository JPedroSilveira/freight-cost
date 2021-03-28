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
    expect((cost as Cost).value === entity.value).toBe(true)
})

test('save two itens', async () => {
    const entity: Cost = {
        value: 50
    }

    await CostService.save(entity)

    const cost = await CostService.get()

    expect(cost).not.toBe(undefined)
    expect((cost as Cost).value === entity.value).toBe(true)

    const entity2: Cost = {
        value: 100
    }

    await CostService.save(entity2)

    const cost2 = await CostService.get()
    
    expect(cost2).not.toBe(undefined)
    expect((cost2 as Cost).value === entity2.value).toBe(true)
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
    expect((cost as Cost).value === entity3.value).toBe(true)
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

    const result = await CostService.save(entity)

    const cost = await CostService.get()

    expect(result).toBe(false)
    if (cost) expect(cost.value !== entity.value).toBe(true)
})

test('getStringValueWithCurrencySymbol with zero', async () => {
    const entity: Cost = {
        value: 0
    }

    const result = CostService.getStringValueWithCurrencySymbol(entity)

    expect(result).toBe('R$ 0,00')
})

test('getStringValueWithCurrencySymbol with usual value', async () => {
    const entity: Cost = {
        value: 5.32
    }

    const result = CostService.getStringValueWithCurrencySymbol(entity)

    expect(result).toBe('R$ 5,32')
})

test('getStringValueWithCurrencySymbol with unrounded value (to floor)', async () => {
    const entity: Cost = {
        value: 5.322
    }

    const result = CostService.getStringValueWithCurrencySymbol(entity)

    expect(result).toBe('R$ 5,32')
})

test('getStringValueWithCurrencySymbol with unrounded value (to ceil)', async () => {
    const entity: Cost = {
        value: 5.327
    }

    const result = CostService.getStringValueWithCurrencySymbol(entity)

    expect(result).toBe('R$ 5,33')
})

test('getStringValueWithCurrencySymbol with negative value', async () => {
    const entity: Cost = {
        value: -5.327
    }

    const result = CostService.getStringValueWithCurrencySymbol(entity)

    expect(result).toBe('R$ 0,00')
})

test('getStringValue with zero', async () => {
    const entity: Cost = {
        value: 0
    }

    const result = CostService.getStringValueWithDot(entity)

    expect(result).toBe('0.00')
})

test('getStringValue with usual value', async () => {
    const entity: Cost = {
        value: 5.32
    }

    const result = CostService.getStringValueWithDot(entity)

    expect(result).toBe('5.32')
})

test('getStringValue with unrounded value (to floor)', async () => {
    const entity: Cost = {
        value: 5.322
    }

    const result = CostService.getStringValueWithDot(entity)

    expect(result).toBe('5.32')
})

test('getStringValue with unrounded value (to ceil)', async () => {
    const entity: Cost = {
        value: 5.327
    }

    const result = CostService.getStringValueWithDot(entity)

    expect(result).toBe('5.33')
})

test('getStringValue with negative value', async () => {
    const entity: Cost = {
        value: -5.327
    }

    const result = CostService.getStringValueWithDot(entity)

    expect(result).toBe('0.00')
})

test('moneyMask with usual value', async () => {
    const value = '2121.28'

    const result = CostService.moneyMask(value)

    expect(result).toBe('2121.28')
})

test('moneyMask with excessive decimal numbers', async () => {
    const value = '2121.2888888'

    const result = CostService.moneyMask(value)

    expect(result).toBe('21212888.88')
})

test('moneyMask with negative value', async () => {
    const value = '-12.13'

    const result = CostService.moneyMask(value)

    expect(result).toBe('12.13')
})

test('moneyMask without decimal value', async () => {
    const value = '2324'

    const result = CostService.moneyMask(value)

    expect(result).toBe('23.24')
})

test('moneyMask value with blank space', async () => {
    const value = '2324 .00'

    const result = CostService.moneyMask(value)

    expect(result).toBe('2324.00')
})

test('moneyMask value with blank space', async () => {
    const value = '23  24.00'

    const result = CostService.moneyMask(value)

    expect(result).toBe('2324.00')
})

test('moneyMask value with blank space', async () => {
    const value = '2324.00  '

    const result = CostService.moneyMask(value)

    expect(result).toBe('2324.00')
})

test('moneyMask value with blank space', async () => {
    const value = '  232  4.00  '

    const result = CostService.moneyMask(value)

    expect(result).toBe('2324.00')
})

test('moneyMask empty value', async () => {
    const value = ''

    const result = CostService.moneyMask(value)

    expect(result).toBe('0.00')
})

test('moneyMask respect max size', async () => {
    const value = '32131232131.12'

    const result = CostService.moneyMask(value)

    expect(result).toBe('32131232.13')
})

test('moneyMask respect max size', async () => {
    const value = '3213211.124145'

    const result = CostService.moneyMask(value)

    expect(result).toBe('32132111224')
})