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
     * @returns Cost ou undefined
    */
    get = async () => {
        const data = await DexieUtils.getAll(this.table)
        return data.length > 0 ? data[0] : undefined
    }


    /**
     * Salva um novo valor, caso seja válida será inserido um novo id a entidade
     * @param entity Nova entidade
     */
    save = async (entity: Cost) => {
        if (this.isValid(entity)[0]) {
            await DexieUtils.deleteAll(this.table)
            entity.id = undefined
            await DexieUtils.saveWithId(this.table, entity)
        }
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