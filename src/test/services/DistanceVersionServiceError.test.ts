import { DistanceVersionService } from "../../services"

test('get with error', async () => {
    const result = await DistanceVersionService.get()

    expect(result).toBe(false)
})

test('save with error', async () => {
    const result = await DistanceVersionService.save({
        value: 100
    })

    expect(result).toBe(false)
})