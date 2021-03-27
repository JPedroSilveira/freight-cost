import { DistanceService } from "../../services"

test('getByOriginAndDestiny with error', async () => {
    const result = await DistanceService.getByOriginAndDestiny({
        destinyId: 1,
        originId: 2
    })

    expect(result).toBe(false)
})

test('getAll with error', async () => {
    const result = await DistanceService.getAll()

    expect(result).toBe(false)
})

test('saveAll with error', async () => {
    const result = await DistanceService.saveAll([])

    expect(result).toBe(false)
})

test('deleteAll with error', async () => {
    const result = await DistanceService.deleteAll()

    expect(result).toBe(false)
})