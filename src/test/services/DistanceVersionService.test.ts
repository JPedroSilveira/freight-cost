import DistanceVersion from "../../types/DistanceVersion"
import { DistanceVersionService } from "../../services"

jest.mock("../../storage/Database.ts")

test('save one item', async () => {
    const entity: DistanceVersion = {
        value: 1
    }

    await DistanceVersionService.save(entity)

    const version = await DistanceVersionService.get()

    expect(version).not.toBe(undefined)
    expect((version as DistanceVersion).value === entity.value).toBe(true)
})

test('save two itens', async () => {
    const entity: DistanceVersion = {
        value: 1
    }

    await DistanceVersionService.save(entity)

    const distance = await DistanceVersionService.get()

    expect(distance).not.toBe(undefined)
    expect((distance as DistanceVersion).value === entity.value).toBe(true)

    const entity2: DistanceVersion = {
        value: 2
    }

    await DistanceVersionService.save(entity2)

    const distance2 = await DistanceVersionService.get()
    
    expect(distance2).not.toBe(undefined)
    expect((distance2 as DistanceVersion).value === entity2.value).toBe(true)
})

test('save three itens', async () => {
    const entity1: DistanceVersion = {
        value: 1
    }

    await DistanceVersionService.save(entity1)

    const entity2: DistanceVersion = {
        value: 2
    }

    await DistanceVersionService.save(entity2)

    const entity3: DistanceVersion = {
        value: 4
    }

    await DistanceVersionService.save(entity3)

    const version = await DistanceVersionService.get()
    
    expect(version).not.toBe(undefined)
    expect((version as DistanceVersion).value === entity3.value).toBe(true)
})