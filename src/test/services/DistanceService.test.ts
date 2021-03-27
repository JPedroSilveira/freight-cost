import Distance from '../../types/Distance';
import { DistanceService } from "../../services"

jest.mock("../../storage/Database.ts")

beforeEach(done => {
    DistanceService.deleteAll().then(() => done())
})

test('saveAll with three values', async () => {
    const entities: Distance[] = [
        {
            destinyId: 1,
            originId: 2,
            value: 100
        },
        {
            destinyId: 2,
            originId: 3,
            value: 150
        },
        {
            destinyId: 4,
            originId: 3,
            value: 210
        },
    ]

    await DistanceService.saveAll(entities)

    const distances = await DistanceService.getAll()

    expect(distances.length).toBe(3)
})

test('saveAll with zero values', async () => {
    const entities: Distance[] = []

    await DistanceService.saveAll(entities)

    const distances = await DistanceService.getAll()

    expect(distances.length).toBe(0)
})

test('saveAll with two values (with same destiny and origin)', async () => {
    const entities: Distance[] = [
        {
            destinyId: 2,
            originId: 2,
            value: 0
        },
        {
            destinyId: 3,
            originId: 3,
            value: 150
        },
    ]

    await DistanceService.saveAll(entities)

    const distances = await DistanceService.getAll()

    expect(distances.length).toBe(2)
})

test('getAll with two values', async () => {
    const entities: Distance[] = [
        {
            destinyId: 1,
            originId: 2,
            value: 100
        },
        {
            destinyId: 2,
            originId: 3,
            value: 150
        }
    ]

    await DistanceService.saveAll(entities)

    const distances = await DistanceService.getAll()

    expect(distances.length).toBe(2)
    expect(distances.find(item => item.destinyId === 2 && item.originId === 3 && item.value === 150))
        .not.toBe(undefined)
    expect(distances.find(item => item.destinyId === 1 && item.originId === 2 && item.value === 100))
        .not.toBe(undefined)
})

test('getAll with four values (two with equal origin and destiny)', async () => {
    const entities: Distance[] = [
        {
            destinyId: 1,
            originId: 2,
            value: 100
        },
        {
            destinyId: 2,
            originId: 3,
            value: 150
        },
        {
            destinyId: 3,
            originId: 3,
            value: 0
        },
        {
            destinyId: 4,
            originId: 4,
            value: 5
        }
    ]

    await DistanceService.saveAll(entities)

    const distances = await DistanceService.getAll()

    expect(distances.length).toBe(4)
    expect(distances.find(item => item.destinyId === 2 && item.originId === 3 && item.value === 150))
        .not.toBe(undefined)
    expect(distances.find(item => item.destinyId === 1 && item.originId === 2 && item.value === 100))
        .not.toBe(undefined)
    expect(distances.find(item => item.destinyId === 3 && item.originId === 3 && item.value === 0))
        .not.toBe(undefined)
    expect(distances.find(item => item.destinyId === 4 && item.originId === 4 && item.value === 5))
        .not.toBe(undefined)
})

test('deleteAll with zero values', async () => {
    await DistanceService.deleteAll()
    const distances = await DistanceService.getAll()

    expect(distances.length).toBe(0)
})

test('deleteAll with two values', async () => {
    const entities: Distance[] = [
        {
            destinyId: 1,
            originId: 2,
            value: 100
        },
        {
            destinyId: 2,
            originId: 3,
            value: 150
        }
    ]

    await DistanceService.saveAll(entities)
    await DistanceService.deleteAll()

    const cities = await DistanceService.getAll()

    expect(cities.length).toBe(0)
})