import IDTable from '../types/IDTable'

class DexieUtils {
    /**
     * Salva uma lista de entidades na tabela salvando na entrada seus respectivos ids criados
     * @param table Tabela da entidade
     * @param entities Lista de entidades
     * @returns true em caso de sucesso e false em caso de erro na operação
     */
    saveAllWithId = async <ENTITY extends IDTable<PK>, PK> (table: Dexie.Table<ENTITY,PK>, entities: ENTITY[]) => {
        try {
            const ids = await table.bulkPut(entities, { allKeys: true })
            entities.forEach((entity, index) => entity.id = ids[index])
            return true
        } catch(e) { return false }
    }

    /**
     * Salva uma lista de entidades na tabela
     * @param table Tabela da entidade
     * @param entities Lista de entidades
     * @returns true em caso de sucesso e false em caso de erro na operação
     */
    saveAll = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>, entities: ENTITY[]) => {
        try {
            await table.bulkPut(entities)
            return true
        } catch(e) { return false }
    }

    /**
     * Busca todos os elementos de uma tabela
     * @param table Tabela da entidade 
     * @returns lista com todas as informações da tabela e false em caso de erro na operação
     */
    getAll = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>) => {
        try {
            return table.toArray()
        } catch(e) { return false }
    }

    /**
     * Remove todos os elementos da tabela
     * @param table Tabela da entidade 
     * @returns true em caso de sucesso e false em caso de erro na operação
     */
    deleteAll = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>) => {
        try {
            await table.clear()
            return true
        } catch(e) { return false }
    }

    /**
     * Salva uma entidade
     * @param table Tabela da entidade 
     * @returns true em caso de sucesso e false em caso de erro na operação
    */
    save = async <ENTITY, PK> (table: Dexie.Table<ENTITY,PK>, entity: ENTITY) => {
        try {
            await table.put(entity)
            return true
        } catch(e) { return false }
    }
}

export default new DexieUtils()