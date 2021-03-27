import IDTable from '../types/IDTable'

class DexieUtils {
    /**
     * Salva uma lista de entidades na tabela salvando na entrada seus respectivos ids criados
     * @param table Tabela da entidade
     * @param entities Lista de entidades
     */
    saveAllWithId = async <ENTITY extends IDTable<PK>, PK> (table: Dexie.Table<ENTITY,PK>, entities: ENTITY[]) => {
        const ids = await table.bulkPut(entities, { allKeys: true })
        entities.forEach((entity, index) => entity.id = ids[index])
    }

    /**
     * Salva uma lista de entidades na tabela
     * @param table Tabela da entidade
     * @param entities Lista de entidades
     */
    saveAll = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>, entities: ENTITY[]) => {
        await table.bulkPut(entities)
    }

    /**
     * Busca todos os elementos de uma tabela
     * @param table Tabela da entidade 
     */
    getAll = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>) => {
        return table.toArray()
    }

    /**
     * Remove todos os elementos da tabela
     * @param table Tabela da entidade 
     */
    deleteAll = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>) => {
        return table.clear()
    }

    /**
     * Salva uma entidade, se tiver chave primária tenta atualizar
     * @param table Tabela da entidade 
    */
    saveWithId = async <ENTITY extends IDTable<PK>, PK> (table: Dexie.Table<ENTITY,PK>, entity: ENTITY) => {
        const id = await table.put(entity)
        entity.id = id
    }
}

export default new DexieUtils()