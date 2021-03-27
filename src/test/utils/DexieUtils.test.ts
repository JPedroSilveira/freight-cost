import Database from "../../storage/Database"
import City from "../../types/City"
import DexieUtils from "../../utils/DexieUtils"

jest.mock("../../storage/Database")

beforeEach(done => {
    const cityTable = Database.city
    DexieUtils.deleteAll(cityTable).then(() => done())
})

test('save empty list returning ids', async () => {
    const cityTable = Database.city
    const entities: City[] = []
    await DexieUtils.saveAllWithId(cityTable, entities)
    expect(entities.length).toBe(0)
})

test('save all returning ids', async () => {
    const cityTable = Database.city
    const entities = [
        {
            name: 'teste 1'
        }, 
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        }
    ] as City[]
    await DexieUtils.saveAllWithId(cityTable, entities)

    expect(entities![0].id).not.toBe(undefined)
    expect(entities![1].id).not.toBe(undefined)
    expect(entities![2].id).not.toBe(undefined)
})

test('save all returning ids in order', async () => {
    for (let x = 0; x < 12; x++) {
        const cityTable = Database.city
        const entities = [
            {
                name: 'teste 1'
            }, 
            {
                name: 'teste 2'
            },
            {
                name: 'teste 3'
            }
        ] as City[]
        await DexieUtils.saveAllWithId(cityTable, entities)
        
        expect(entities![0].id).not.toBe(undefined)
        expect(entities![0].name).toBe('teste 1')
        expect(entities![1].id).not.toBe(undefined)
        expect(entities![1].name).toBe('teste 2')
        expect(entities![2].id).not.toBe(undefined)
        expect(entities![2].name).toBe('teste 3')
    }
})

test('save empty not returning ids', async () => {
    const cityTable = Database.city
    const entities: City[] = []
    await DexieUtils.saveAll(cityTable, entities)
    expect(entities.length).toBe(0)
})

test('save all not returning ids', async () => {
    const cityTable = Database.city
    const entities = [
        {
            name: 'teste 1'
        }, 
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        }
    ] as City[]
    await DexieUtils.saveAll(cityTable, entities)
    
    expect(entities![0].id).toBe(undefined)
    expect(entities![1].id).toBe(undefined)
    expect(entities![2].id).toBe(undefined)
})

test('save all not returning ids in order', async () => {
    for (let x = 0; x < 12; x++) {
        const cityTable = Database.city
        const entities = [
            {
                name: 'teste 1'
            }, 
            {
                name: 'teste 2'
            },
            {
                name: 'teste 3'
            }
        ] as City[]
        await DexieUtils.saveAll(cityTable, entities)
        
        expect(entities![0].id).toBe(undefined)
        expect(entities![0].name).toBe('teste 1')
        expect(entities![1].id).toBe(undefined)
        expect(entities![1].name).toBe('teste 2')
        expect(entities![2].id).toBe(undefined)
        expect(entities![2].name).toBe('teste 3')
    }
})

test('delete all', async () => {
    const cityTable = Database.city
    const entities = [
        {
            name: 'teste 1'
        }, 
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        }
    ] as City[]

    await DexieUtils.saveAll(cityTable, entities)

    const fresult = await DexieUtils.getAll(cityTable)

    expect(fresult.length).not.toBe(0)

    await DexieUtils.deleteAll(cityTable)
    
    const sresult = await DexieUtils.getAll(cityTable)
    
    expect(sresult.length).toBe(0)
})

test('get all with three items', async () => {
    const cityTable = Database.city

    const entities = [
        {
            name: 'teste 1'
        }, 
        {
            name: 'teste 2'
        },
        {
            name: 'teste 3'
        }
    ] as City[]

    await DexieUtils.saveAll(cityTable, entities)

    const result = await DexieUtils.getAll(cityTable)
    
    expect(result.length).toBe(3)
    expect(result.find(item => item.name === 'teste 1')).not.toBe(undefined)
    expect(result.find(item => item.name === 'teste 2')).not.toBe(undefined)
    expect(result.find(item => item.name === 'teste 3')).not.toBe(undefined)
})

test('get all in empty table', async () => {
    const cityTable = Database.city

    const result = await DexieUtils.getAll(cityTable)
    
    expect(result.length).toBe(0)
})

test('get all in table with one item', async () => {
    const cityTable = Database.city

    const entities = [
        {
            name: 'teste 1'
        }
    ] as City[]

    await DexieUtils.saveAll(cityTable, entities)

    const result = await DexieUtils.getAll(cityTable)
    
    expect(result.length).toBe(1)
})