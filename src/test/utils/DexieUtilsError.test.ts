import Database from "../../storage/Database"
import City from "../../types/City"
import DexieUtils from "../../utils/DexieUtils"

test('save all with id returning error', async () => {
    const cityTable = Database.city
    const entities: City[] = []
    const success = await DexieUtils.saveAllWithId(cityTable, entities)
    expect(success).toBe(false)
})

test('save all returning error', async () => {
    const cityTable = Database.city
    const entities: City[] = []
    const success = await DexieUtils.saveAll(cityTable, entities)
    expect(success).toBe(false)
})

test('get all returning error', async () => {
    const cityTable = Database.city
    const success = await DexieUtils.getAll(cityTable)
    expect(success).toBe(false)
})

test('delete all returning error', async () => {
    const cityTable = Database.city
    const success = await DexieUtils.deleteAll(cityTable)
    expect(success).toBe(false)
})

test('save returning error', async () => {
    const cityTable = Database.city
    const entity: City = {
        name: 'teste'
    }
    const success = await DexieUtils.save(cityTable, entity)
    expect(success).toBe(false)
})