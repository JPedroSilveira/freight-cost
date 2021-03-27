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

    /**
     * Busca todos os destinos com base na origem e no destino
     * @param index Indíce de busca contendo o id de origem e o id de destino
     * @returns se existir retorna a entidade correspondente, se não existir retorna undefined e em caso de erro retorna false
     */
    getByOriginAndDestiny = async (index: CompoundIndex) => {
        try {
            return this.table.where(index).first()
        } catch(e) {
            return false
        }
    }

    /**
     * Retorna todas as entidades no banco de dados
     * @returns lista com todas as distâncias salvas ou false em caso de erro
     */
    getAll = () => {
        return DexieUtils.getAll(this.table)
    }

    /**
     * Salva uma lista de entidades
     * @param distances Lista de distâncias
     * @returns true em caso de sucesso e false em caso de erro
     */ 
    saveAll = async (distances: Distance[]) => {
        return DexieUtils.saveAll(this.table, distances)
    }

    /**
     * Remove todas as distâncias do banco de dados
     * @returns true em caso de sucesso e false em caso de erro
     */
    deleteAll = async () => {
        return DexieUtils.deleteAll(this.table)
    }
}

export default DistanceService