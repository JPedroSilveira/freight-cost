import { CityService, DistanceService, PathService, CostService } from '../../services'
import Distance from '../../types/Distance'
import City from '../../types/City'
import Cost from '../../types/Cost'
import CostConstants from '../../constants/CostConstants'

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
            value: 100
        },
        {
            originId: cities[0].id!,
            destinyId: cities[1].id!,
            value: 150
        }
    ]

    await DistanceService.saveAll(distances)

    const cost: Cost = {
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result.withError).toBe(false)
    expect(result.withInvalidData).toBe(false)
    expect(result.withoutPath).toBe(false)
    expect(result.shortPath!.originCity).toBe(cities[0].name)
    expect(result.shortPath!.destinyCity).toBe(cities[1].name)
    expect(result.shortPath!.distance).toBe(distances[1].value)
    expect(result.shortPath!.cost).toBe(distances[1].value * cost.value)
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
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result.withInvalidData).toBe(true)
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
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result.withoutPath).toBe(true)
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
         value: 100
    }

    await CostService.save(cost)

    const result1 = await PathService.calcShortPath(validCity, invalidCity, cost)

    expect(result1.withInvalidData).toBe(true)

    const result2 = await PathService.calcShortPath(invalidCity, validCity, cost)
    
    expect(result2.withInvalidData).toBe(true)
})

test('calc distance between three cities', async () => {
    const cities: City[] = [
        {
            name: 'city 1'
        },
        {
            name: 'city 2'
        },
        {
            name: 'city 3'
        }
    ]

    await CityService.saveAll(cities)
    
    const distances: Distance[] = [
        {
            originId: cities[0].id!,
            destinyId: cities[1].id!,
            value: 100
        },
        {
            originId: cities[1].id!,
            destinyId: cities[2].id!,
            value: 150
        }
    ]

    await DistanceService.saveAll(distances)

    const cost: Cost = {
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcPath(cities, cost)

    expect(result.withError).toBe(false)
    expect(result.withInvalidData).toBe(false)
    expect(result.withoutPath).toBe(false)

    expect(result.path!.shortPaths[0].originCity).toBe(cities[0].name)
    expect(result.path!.shortPaths[0].destinyCity).toBe(cities[1].name)

    expect(result.path!.shortPaths[1].originCity).toBe(cities[1].name)
    expect(result.path!.shortPaths[1].destinyCity).toBe(cities[2].name)

    const totalDistance = distances.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    expect(result.path!.totalCost).toBe(totalDistance * cost.value)
    expect(result.path!.totalDistance).toBe(totalDistance)
    expect(result.path!.totalDays).toBe(Math.round(totalDistance / CostConstants.KM_PER_DAY))
    expect(result.path!.totalFuel).toBe(totalDistance * CostConstants.FUEL_PER_KM)
})

test('calc distance between two valid cities and one invalid', async () => {
    const cities: City[] = [
        {
            name: 'city 1'
        },
        {
            name: 'city 2'
        },
        {
            name: 'city 3'
        }
    ]

    await CityService.saveAll(cities.slice(1, cities.length))
    
    const distances: Distance[] = [
        {
            originId: cities[1].id!,
            destinyId: cities[2].id!,
            value: 150
        }
    ]

    await DistanceService.saveAll(distances)

    const cost: Cost = {
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcPath(cities, cost)

    expect(result.withInvalidData).toBe(true)
})

test('calc distance between three cities without second distance', async () => {
    const cities: City[] = [
        {
            name: 'city 1'
        },
        {
            name: 'city 2'
        },
        {
            name: 'city 3'
        }
    ]

    await CityService.saveAll(cities)
    
    const distances: Distance[] = [
        {
            originId: cities[0].id!,
            destinyId: cities[1].id!,
            value: 150
        }
    ]

    await DistanceService.saveAll(distances)

    const cost: Cost = {
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcPath(cities, cost)

    expect(result.withoutPath).toBe(true)
})

test('calc distance between three cities without first distance', async () => {
    const cities: City[] = [
        {
            name: 'city 1'
        },
        {
            name: 'city 2'
        },
        {
            name: 'city 3'
        }
    ]

    await CityService.saveAll(cities)
    
    const distances: Distance[] = [
        {
            originId: cities[1].id!,
            destinyId: cities[2].id!,
            value: 150
        }
    ]

    await DistanceService.saveAll(distances)

    const cost: Cost = {
         value: 100
    }

    await CostService.save(cost)

    const result = await PathService.calcPath(cities, cost)

    expect(result.withoutPath).toBe(true)
})