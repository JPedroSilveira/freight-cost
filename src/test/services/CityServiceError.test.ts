import { CityService } from "../../services"

test('getAll with error', async () => {
    const result = await CityService.getAll()

    expect(result).toBe(false)
})

test('saveAll with error', async () => {
    const result = await CityService.saveAll([])

    expect(result).toBe(false)
})

test('deleteAll with error', async () => {
    const result = await CityService.deleteAll()

    expect(result).toBe(false)
})