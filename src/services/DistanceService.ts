import DexieUtils from "../utils/DexieUtils"
import Distance from '../types/Distance'

interface CompoundIndex {
    originId: number,
    destinyId: number
}

class DistanceService {
    private table: Dexie.Table<Distance, string>

    constructor(table: Dexie.Table<Distance, string>) {
        this.table = table
    }

    getByOriginAndDestiny = async (index: CompoundIndex) => {
        return this.table.where(index).first()
    }

    /**
     * Retorna todas as entidades no banco de dados
     * @returns lista com todas as distâncias salvas
     */
    getAll = () => {
        return DexieUtils.getAll(this.table)
    }

    /**
     * Salva uma lista de entidades e NÃO atualiza os ids da entrada
     * @param distances Lista de distâncias
     */ 
    saveAll = async (distances: Distance[]) => {
        await DexieUtils.saveAll(this.table, distances)
    }

    /**
     * Remove todas as distâncias do banco de dados
     */
    deleteAll = async () => {
        await DexieUtils.deleteAll(this.table)
    }
}

export default DistanceService