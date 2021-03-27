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
     * @returns se existir retorna a entidade correspondente, se não retorna undefined
     */
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
     * Salva uma lista de entidades
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