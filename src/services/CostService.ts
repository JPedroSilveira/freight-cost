import Cost from "../types/Cost"
import DexieUtils from "../utils/DexieUtils"

class CostService {
    private table: Dexie.Table<Cost, number>

    constructor(table: Dexie.Table<Cost, number>) {
        this.table = table
    }

    /**
     * Retorna a primeira entrada
     * @returns Cost ou undefined
    */
    get = async () => {
        const data = await DexieUtils.getAll(this.table)
        return data.length > 0 ? data[0] : undefined
    }


    /**
     * Salva um novo valor
     * @param entity Nova entidade
     */
    save = async <ENTITY, PK> (entity: Cost) => {
        await DexieUtils.deleteAll(this.table)
        entity.id = undefined
        await DexieUtils.saveWithId(this.table, entity)
    }
}

export default CostService