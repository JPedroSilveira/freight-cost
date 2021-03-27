import City from "../types/City"
import Distance from '../types/Distance'
import StringUtils from "../utils/StringUtils"
import { CityService, DistanceService } from './index'

class SaveDataService {
    /**
     * Salva as informações de distância entre cidades no IndexedDB
     * @param data String com conteúdo em formato CSV onde:
     **  Cabeçalho: representa as cidades
     **  Linhas: representam as distâncias, onde a coluna representa a cidade de destino conforme cabeçalho 
     *          e a linha representa a cidade de partida conforme ordem do cabeçalho
     * @returns true caso os dados sejam extraídos e salvos com sucesso, do contrário false
     */
    saveDistances = async (data: string) => {
        const lines = StringUtils.splitByLine(data)

        if (lines) {
            try {
                const [citiesLine, distancesLines] = this.separeCitiesFromDistancies(lines)

                const cities = await this.saveCities(citiesLine)

                if (cities) await this.saveCitiesDistances(cities, distancesLines)
            } catch(e) {}
        }

        return false
    }

    /**
     * Salva as cidades do CSV no banco de dados
     * @param citiesLine Cabeçalho do CSV representando as cidades
     * @returns em caso de sucesso retorna a lista de entidade salvas, caso contrário retorna undefined
     */
    private saveCities = async (citiesLine: string) => {
        const cities = StringUtils.splitByDotComma(citiesLine)
        if (cities) {
            const entities = cities.map(city => ({
                name: city
            } as City))

            // Salva todas as cidades no banco de dados
            await CityService.saveAll(entities)
            
            return entities
        }
    }

    /**
     * Salva as distâncias entre as cidades
     * @param cities 
     * @param distancesLines 
     */
    private saveCitiesDistances = async (cities: City[], distancesLines: string[]) => {
        const distances: Distance[] = []
        // Cria as distâncias a partir das cidades de origem, caso haja mais linhas que cidades as últimas serão ignoradas
        cities.forEach((city, index) => {
            // Valida se a cidade possui um id do banco de dados
            if (city.id === undefined) return

            // Usa o indíce para recuperar a linha que corresponde as distâncias onde a mesma é a origem
            const cityOriginLine = distancesLines[index]

            // Extraí os valores para um vetor
            const distancesLine = StringUtils.splitByDotComma(cityOriginLine)
            
            // Cria as entidades de destino para cada valor de distância desta cidade
            if (distancesLine) {
                if (this.isInvalidDistances(distancesLine, cities)) return
                
                distancesLine.forEach((distanceValue, index) => {
                    // Distâncias vazias são ignoradas
                    if (StringUtils.isEmpty(distanceValue)) return
                    const distance = {
                        originId: city.id!,
                        destinyId: cities[index].id!,
                        value: parseInt(distanceValue)
                    } as Distance
                    distances.push(distance)
                })
            }
        })

        // Salva no banco de dados
        DistanceService.saveAll(distances)
    } 

    /**
     * Valida se o tamanho do vetor de distancia 
     * @param distances Lista com distâncias entre duas cidades
     * @param cities Lista de cidades salvas no banco de dados
     * @returns 
     */
    private isInvalidDistances = (distances: string[], cities: City[]) => {
        return distances.length > cities.length
    }

    /**
     * Extraí a linha que representa as cidades e as linhas que representam as distâncias do CSV 
     * @param distancesLines par com a linha das cidades (0) e as linhas das distâncias (1)
     */
    private separeCitiesFromDistancies = (csvLines: string[]): [string, string[]] => {
        return [csvLines[0], csvLines.slice(1, csvLines.length)]
    }
}

export default SaveDataService