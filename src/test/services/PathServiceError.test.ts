import { PathService } from "../../services"
import City from "../../types/City"
import Cost from "../../types/Cost"

test('calcShortPath with error', async () => {
    const cities: City[] = [
        {
            name: 'teste 1',
            id: 1
        },
        {
            name: 'teste 2',
            id: 2
        }
    ]

    const cost: Cost = {
        value: 100
    }

    const result = await PathService.calcShortPath(cities[0], cities[1], cost)

    expect(result.withError).toBe(true)
})

test('calcPath with error', async () => {
    const cities: City[] = [
        {
            name: 'teste 1',
            id: 1
        },
        {
            name: 'teste 2',
            id: 2
        }
    ]

    const cost: Cost = {
        value: 100
    }

    const result = await PathService.calcPath(cities, cost)

    expect(result.withError).toBe(true)
})