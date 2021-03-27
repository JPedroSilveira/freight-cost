import { DistanceService } from '../services'
import City from "../types/City"
import ShortPath from '../types/ShortPath'
import Cost from "../types/Cost"
import CostConstants from "../constants/CostConstants"
import Path from "../types/Path"

interface Result {
    withError: boolean
    withoutPath: boolean
    withInvalidData: boolean
}

interface CitiesPathsResult extends Result {
    shortPaths: ShortPath[]
    totalCost: number
    totalDistance: number
}

interface ShortPathResult extends Result {
    shortPath?: ShortPath
}

interface PathResult extends Result {
    path?: Path
}

class PathService {
    /**
     * Calcula o caminho entre duas cidades baseado em um custo
     * @param origin cidade de origem
     * @param destiny cidade destino
     * @param cost custo atual
     * @returns retorna um objeto do tipo ShortPathResult com os seguintes atributos:
     ** withInvalidData: true caso a entrada seja inválida
     ** withError: true caso tenha ocorrido um erro
     ** withoutPath: true caso não exista caminho entre as cidades
     ** shortPath: caminho encontrado ou undefined caso algum valor acima seja true
     */
    calcShortPath = async (origin: City, destiny: City, cost: Cost) => {
        const response: ShortPathResult = {
            withError: false,
            withInvalidData: false,
            withoutPath: false
        }

        const isInvalidData = origin.id === undefined || destiny.id === undefined
        if (isInvalidData) {
            response.withInvalidData = true
            return response
        }

        const distance = await DistanceService.getByOriginAndDestiny({
            originId: origin.id!,
            destinyId: destiny.id!
        })

        if (distance === false) {
            response.withError = true
            return response
        }

        if (distance === undefined) {
            response.withoutPath = true
            return response
        }

        const totalCost = distance.value * cost.value

        const shortPath: ShortPath = {
            destinyCity: destiny.name,
            originCity: origin.name,
            distance: distance.value,
            cost: totalCost
        }

        response.shortPath = shortPath

        return response
    }

    /**
     * Calcula o caminho percorrendo n cidades em ordem
     * @param cities Lista ordenada de cidades
     * @param cost Custo por ditância atual
     * @returns um objeto do tipo PathResult com os seguintes atributos:
     ** withError: true caso ocorra erro no processo
     ** withoutPath: true caso não exista caminho entre duas cidades
     ** withInvalidData: true caso a entrada esteja inválida
     ** path: objeto especificando o caminho encontrado ou undefined caso algum dos atributos acima sejam true
     */
    calcPath = async (cities: City[], cost: Cost): Promise<PathResult> => {
        const response: PathResult = {
            withError: false,
            withoutPath: false,
            withInvalidData: false
        }

        if (cities.some(city => city.id === undefined)) {
            response.withInvalidData = true
            return response
        } 

        const shortPathResults = await this.getShortPathsBetweenCities(cities, cost)

        if (shortPathResults.withError) {
            response.withError = true
            return response
        }

        if (shortPathResults.withoutPath) {
            response.withoutPath = true
            return response
        }

        if (shortPathResults.withInvalidData) {
            response.withInvalidData = true
            return response
        }

        const shortPaths = shortPathResults.shortPaths
        const totalFuel = CostConstants.FUEL_PER_KM * shortPathResults.totalDistance
        const totalDays = Math.round(shortPathResults.totalDistance / CostConstants.KM_PER_DAY)

        const path: Path = {
            shortPaths: shortPaths,
            totalCost: shortPathResults.totalCost,
            totalDistance: shortPathResults.totalDistance,
            totalFuel: totalFuel,
            totalDays: totalDays
        }

        response.path = path

        return response
    }

    /**
     * Calcula os caminhos entre cidades 
     * @param cities Lista de cidades
     * @param cost Custo
     * @returns retorna um objeto CitiesPathsResult com os seguintes atributos:
     ** shortPaths: caminhos encontrados
     ** withError: true caso ocorra erro durante o processo
     ** withoutPath: true caso não exista um caminho entre duas cidades
     ** totalCost: custo total do caminho
     ** totalDistance: distância total da viagem
     */
    private getShortPathsBetweenCities = async (cities: City[], cost: Cost): Promise<CitiesPathsResult> => {
        const response: CitiesPathsResult = {
            shortPaths: [],
            withError: false,
            withoutPath: false,
            withInvalidData: false,
            totalCost: 0,
            totalDistance: 0
        }

        const shortPathPromisses = cities.slice(0, cities.length - 1).map(async (city, index) => {
            const origin = city
            const destiny = cities[index + 1]
            
            const result = await this.calcShortPath(origin, destiny, cost)

            if (result.shortPath) {
                response.totalCost += result.shortPath.cost
                response.totalDistance += result.shortPath.distance
                response.shortPaths.push(result.shortPath)
            }

            return result
        })

        const results = await Promise.all(shortPathPromisses)

        const hasErrorResult = results.some(result => result.withError)
        if (hasErrorResult) {
            response.withError = true
            return response
        }

        const hasCitiesWithoutPath = results.some(result => result.withoutPath)
        if (hasCitiesWithoutPath) {
            response.withoutPath = true
            return response
        }
        
        const hasInvalidData = results.some(result => result.withInvalidData)
        if (hasInvalidData) {
            response.withInvalidData = true
            return response
        }

        return response
    }
}

export default PathService