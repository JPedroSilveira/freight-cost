import City from "../types/City"
import { DistanceService, CostService } from '../services'
import ShortPath from '../types/ShortPath'
import Cost from "../types/Cost"

class PathService {

    /**
     * Calcula o caminho entre duas cidades baseado em um custo
     * @param origin cidade de origem
     * @param destiny cidade destino
     * @param cost custo atual
     * @returns Se as cidades forem válida retorna o caminho, se não retorna undefined
     */
    calcShortPath = async (origin: City, destiny: City, cost: Cost) => {
        if (origin.id === undefined || destiny.id === undefined) return

        // Busca a distância
        const distance = await DistanceService.getByOriginAndDestiny({
            originId: origin.id!,
            destinyId: destiny.id!
        })

        if (!distance) return 

        // Calcula o custo
        const totalCost = distance.valueInKm * cost.valueInRS

        // Estrutura os dados
        const path: ShortPath = {
            destinyCity: destiny.name,
            originCity: origin.name,
            distanceInKM: distance.valueInKm,
            totalCost: totalCost
        }

        return path
    }
}

export default PathService