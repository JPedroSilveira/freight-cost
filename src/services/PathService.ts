import City from "../types/City"
import { DistanceService, CostService } from '../services'
import ShortPath from '../types/ShortPath'
import Cost from "../types/Cost"
import CostConstants from "../constants/CostConstants"
import Path from "../types/Path"

class PathService {

    /**
     * Calcula o caminho entre duas cidades baseado em um custo
     * @param origin cidade de origem
     * @param destiny cidade destino
     * @param cost custo atual
     * @returns Se as cidades forem válidas e tiverem ligação retorna o caminho, se não retorna undefined
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
        const totalCost = distance.value * cost.value

        // Estrutura os dados
        const path: ShortPath = {
            destinyCity: destiny.name,
            originCity: origin.name,
            distanceInKM: distance.value,
            cost: totalCost
        }

        return path
    }

    /**
     * Calcula o caminho percorrendo n cidades em ordem
     * @param cities Lista ordenada de cidades
     * @param cost Custo por ditância atual
     * @returns Se totas as cidades forem válidas e tiverem ligação retorna o caminho completo, se não retorna undefined
     */
    calcPath = async (cities: City[], cost: Cost) => {
        if (cities.some(city => city.id === undefined)) return 

        const shortPaths: ShortPath[] = []
        let totalCost: number = 0
        let totalDistance: number = 0

        const shortPathPromisses = cities.map(async (city, index) => {
            if (index === cities.length -1) return true

            const origin = city
            const destiny = cities[index + 1]
            
            const shortPath = await this.calcShortPath(origin, destiny, cost)

            if (shortPath) {
                totalCost += shortPath.cost
                totalDistance += shortPath.distanceInKM
                shortPaths.push(shortPath)
                return true
            }

            return false
        })

        const isValidResults = await Promise.all(shortPathPromisses)
        const hasInvalidResult = isValidResults.some(isValid => !isValid)
        if (hasInvalidResult) return

        const totalFuel = CostConstants.FUEL_PER_KM * totalDistance
        const totalDays = Math.round(totalDistance / CostConstants.KM_PER_DAY)

        const path: Path = {
            shortPaths: shortPaths,
            totalCost: totalCost,
            totalDistance: totalDistance,
            totalFuel: totalFuel,
            totalDays: totalDays
        }

        return path
    }
}

export default PathService