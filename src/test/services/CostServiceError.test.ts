import { CostService } from "../../services"

test('get with error', async () => {
    const result = await CostService.get()

    expect(result).toBe(false)
})

test('save with error', async () => {
    const result = await CostService.save({
        value: 100
    })

    expect(result).toBe(false)
})