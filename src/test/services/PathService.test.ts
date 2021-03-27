import { CityService, DistanceService, PathService, CostService } from '../../services'
import Distance from '../../types/Distance'
import City from '../../types/City'
import Cost from '../../types/Cost'

jest.mock("../../storage/Database.ts")

beforeEach(done => {
    CityService.deleteAll().then(() => 
        DistanceService.deleteAll().then(() => done())
    )
})

test('calc distance between two cities', async () => {
    const cities: City[] = [
        {
            name: 'city 1'
        },
        {
            name: 'city 2'
        }
    ]

    await CityService.saveAll(cities)
    
    const distances: Distance[] = [
        {
            originId: cities[1].id!,
            destinyId: cities[0].id!,
            valueInKm: 100
        },
        {
            originId: cities[0].id!,
            destinyId: cities[1].id!,
            valueInKm: 150
        }
    ]

    await DistanceService.saveAll(distances)

    const cost: Cost = {
         valueInRS: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result).not.toBe(undefined)
    expect(result!.originCity).toBe(cities[0].name)
    expect(result!.destinyCity).toBe(cities[1].name)
    expect(result!.distanceInKM).toBe(distances[1].valueInKm)
    expect(result!.totalCost).toBe(distances[1].valueInKm * cost.valueInRS)
})


test('calc distance between invalid cities', async () => {
    const cities: City[] = [
        {
            name: 'city 1'
        },
        {
            name: 'city 2'
        }
    ]

    const cost: Cost = {
         valueInRS: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result).toBe(undefined)
})

test('calc distance between cities with invalid ids', async () => {
    const cities: City[] = [
        {
            name: 'city 1',
            id: 100
        },
        {
            name: 'city 2',
            id: 101
        }
    ]

    const cost: Cost = {
         valueInRS: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result).toBe(undefined)
})

test('calc distance between cities with one invalid city', async () => {
    const invalidCity =  {
        name: 'city 1'
    }

    const validCity = {
        name: 'city 2'
    }

    await CityService.saveAll([validCity])

    const cost: Cost = {
         valueInRS: 100
    }

    await CostService.save(cost)

    const result1 = await PathService.calcShortPath(validCity, invalidCity, cost)

    expect(result1).toBe(undefined)

    const result2 = await PathService.calcShortPath(invalidCity, validCity, cost)
    
    expect(result2).toBe(undefined)
})