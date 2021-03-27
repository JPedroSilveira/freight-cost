import City from "../../types/City"
import { CityService } from "../../services"

jest.mock("../../storage/Database.ts")

beforeEach(done => {
    CityService.deleteAll().then(() => done())
})

test('saveAll with four values', async () => {
    const entities: City[] = [
        {
            name: 'teste 1'
        },
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        },
        {
            name: 'teste 4'
        }
    ]

    await CityService.saveAll(entities)

    const cities = await CityService.getAll()

    expect(cities.length).toBe(4)
})

test('saveAll with zero values', async () => {
    const entities: City[] = []

    await CityService.saveAll(entities)

    const cities = await CityService.getAll()

    expect(cities.length).toBe(0)
})

test('getAll with three values', async () => {
    const entities: City[] = [
        {
            name: 'teste 1'
        },
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        }
    ]

    await CityService.saveAll(entities)
    const cities = await CityService.getAll()

    expect(cities.length).toBe(3)
    expect(cities.find(city => city.name === 'teste 1')).not.toBe(undefined)
    expect(cities.find(city => city.name === 'teste 2')).not.toBe(undefined)
    expect(cities.find(city => city.name === 'teste 3')).not.toBe(undefined)
})

test('getAll with zero values', async () => {
    const cities = await CityService.getAll()

    expect(cities.length).toBe(0)
})

test('getAll with two values', async () => {
    const entities: City[] = [
        {
            name: 'teste 1'
        },
        {
            name: 'teste 2'
        },
    ]
    await CityService.saveAll(entities)

    const cities = await CityService.getAll()

    expect(cities.length).toBe(2)
    expect(cities.find(city => city.name === 'teste 1')).not.toBe(undefined)
    expect(cities.find(city => city.name === 'teste 2')).not.toBe(undefined)
})

test('deleteAll with zero values', async () => {
    await CityService.deleteAll()
    const cities = await CityService.getAll()

    expect(cities.length).toBe(0)
})

test('deleteAll with four values', async () => {
    const entities: City[] = [
        {
            name: 'teste 1'
        },
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        },
        {
            name: 'teste 4'
        }
    ]

    await CityService.saveAll(entities)
    await CityService.deleteAll()

    const cities = await CityService.getAll()

    expect(cities.length).toBe(0)
})