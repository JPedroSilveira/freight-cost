import CostConstants from "../constants/CostConstants"
import Cost from "../types/Cost"
import DexieUtils from "../utils/DexieUtils"
import StringUtils from "../utils/StringUtils"

const DEFAULT_VALUE = 0

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

    /**
     * Transforma o valor de custo em uma string formatada com o símbolo monetário
     * @param entity Entidade de custo
     * @returns string formatada
     */
    getStringValueWithCurrencySymbol = (entity?: Cost) => {
        const value = entity ?  entity.value : DEFAULT_VALUE
        return StringUtils.numberToMoneyStringWithSymbol(value)
    }

    /**
     * Transforma o valor de custo em uma string formatada utilizando ponto final como separador de decimais
     * @param entity Entidade de custo
     * @returns string formatada
    */
    getStringValueWithDot = (entity?: Cost) => {
        const value = entity ?  entity.value : DEFAULT_VALUE
        return this.numberToStringValueWithDot(value)
    }

    /**
     * Adiciona uma máscara de valor monetário a uma string em formato numérico separada por ponto
     * @param value String representando o valor monetário
     * @returns string formadata
     */
    moneyMask = (value: string) => {
        if (value === '') {
            return '0.00'
        } 

        value = StringUtils.removeNonNumerical(value).substr(0, CostConstants.MAX_COST_LENGTH)

        const integer = value.substr(0, value.length - 2)
        const decimal =  value.substr(value.length - 2, value.length)
        value =  `${integer}.${decimal}`
        
        const floatValue = parseFloat(value)
        const formatedValue = this.numberToStringValueWithDot(floatValue)
        return formatedValue
    }
    
    private numberToStringValueWithDot = (value: number) => {
        return StringUtils.numberToMoneyString(value).replace(/\./gi, '').replace(',','.')
    }
}

export default CostService