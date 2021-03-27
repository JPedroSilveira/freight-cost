import City from "../types/City"
import DexieUtils from "../utils/DexieUtils"

class CityService {
    private table: Dexie.Table<City, number>

    constructor(table: Dexie.Table<City, number>) {
        this.table = table
    }

    /**
     * Retorna todas as entidades no banco de dados
     * @returns Lista com todas as cidades salvas ou false em caso de erro
     */
    getAll = () => {
        return DexieUtils.getAll(this.table)
    }

    /**
     * Salva uma lista de cidades e atualiza o id das entradas
     * @param cities Lista de cidades
     * @returns true em caso de sucesso e false em caso de erro
     */
    saveAll = async (cities: City[]) => {
        return DexieUtils.saveAllWithId(this.table, cities)
    }

    /**
     * Remove todas as cidades do banco de dados
     * @returns true em caso de sucesso e false em caso de erro
     */
    deleteAll = async () => {
        return DexieUtils.deleteAll(this.table)
    }
}

export default CityService