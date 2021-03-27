import CostConstants from "../constants/CostConstants"
import Cost from "../types/Cost"
import DexieUtils from "../utils/DexieUtils"

class CostService {
    private table: Dexie.Table<Cost, number>

    constructor(table: Dexie.Table<Cost, number>) {
        this.table = table
    }

    /**
     * Retorna a primeira entrada
     * @returns Cost, undefined caso não exista nenhuma registro e false em caso de erro
    */
    get = async () => {
        const data = await DexieUtils.getAll(this.table)
        return data ? data.length > 0 ? data[0] : undefined : false
    }


    /**
     * Salva um novo valor
     * @param entity Nova entidade
     * @returns true se válido, false caso contrário ou em caso de erro
     */
    save = async (entity: Cost) => {
        if (this.isValid(entity)[0]) {
            const success = await DexieUtils.deleteAll(this.table)
            if (!success) return false
            await DexieUtils.save(this.table, entity)
            return true
        }
        return false
    }

    /**
     * Valida uma entidade Cost
     * @param entity Entidade a ser validada
     * @returns retorna um par onde:
     ** O primeiro valor é um booleano com a validade
     ** O segundo é uma string com a descrição do erro
     */
    isValid = (entity: Cost) => {
        if (entity.value < 0) return [false, CostConstants.NEGATIVE_COST]

        return [true, '']
    }
}

export default CostService