import DexieUtils from "../utils/DexieUtils"
import DistanceVersion from '../types/DistanceVersion'

class DistanceVersionService {
    private table: Dexie.Table<DistanceVersion, number>

    constructor(table: Dexie.Table<DistanceVersion, number>) {
        this.table = table
    }

    /**
     * Retorna a primeira entrada
     * @returns DistanceVersion ou undefined
    */
    get = async () => {
        const data = await DexieUtils.getAll(this.table)
        return data.length > 0 ? data[0] : undefined
    }


    /**
     * Salva um novo valor
     * @param entity Nova entidade
     */
    save = async (entity: DistanceVersion) => {
        await DexieUtils.deleteAll(this.table)
        await DexieUtils.save(this.table, entity)
    }
}

export default DistanceVersionService