import DexieUtils from "../utils/DexieUtils"
import DistanceVersion from '../types/DistanceVersion'

class DistanceVersionService {
    private table: Dexie.Table<DistanceVersion, number>

    constructor(table: Dexie.Table<DistanceVersion, number>) {
        this.table = table
    }

    /**
     * Retorna a primeira entrada
     * @returns DistanceVersion, undefined caso não hajam registros e false em caso de erro
    */
    get = async () => {
        const data = await DexieUtils.getAll(this.table)
        return data ? data.length > 0 ? data[0] : undefined : false
    }


    /**
     * Salva um novo valor
     * @param entity Nova entidade
     * @returns true em caso de sucesso ou false em casa de erro na operação
     */
    save = async (entity: DistanceVersion) => {
        const success = await DexieUtils.deleteAll(this.table)
        if (!success) return false
        return DexieUtils.save(this.table, entity)
    }
}

export default DistanceVersionService