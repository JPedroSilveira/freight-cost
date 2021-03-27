import { DistanceVersionService, LoadDataService, SaveDataService, CityService, DistanceService } from '../'
import DistanceVersionConstants from '../../constants/DistanceVersionConstants'
import DistanceVersion from '../../types/DistanceVersion'

class DataService {
    /**
     * Verifica e atualiza as informações de distância caso necessário
     * @returns true caso os dados estejam atualizados e false em caso de erro
     */
    verifyDistanceDataUpdate = async (): Promise<boolean> => {
        const currentVersion = await DistanceVersionService.get()

        if (currentVersion === false) return false

        if (this.shouldUpdateDistance(currentVersion)) {
            const distancesCSV = await LoadDataService.loadDistances()
            if (distancesCSV) {
                const success = await this.deleteOldDate()
                if (!success) return false 

                const saved = await SaveDataService.saveDistances(distancesCSV)
                if (saved) {
                    await DistanceVersionService.save({
                        value: DistanceVersionConstants.VERSION
                    })
                    return saved
                }
            }
            return false
        }

        return true
    }

    /**
     * Remove todos os dados das tabelas de cidades e distâncias
     * @returns true em caso de sucesso e false em caso de erro
     */
    private deleteOldDate = async () => {
        const deleteCitiesSuccess = await CityService.deleteAll()
        if (!deleteCitiesSuccess) return false

        const deleteDistancesSuccess = await DistanceService.deleteAll()
        return deleteDistancesSuccess
    }

    /**
     * Avalia se a versão das informações deve atualizar baseado na versão atual
     * @param currentVersion Versão atual
     * @returns true se a versão deve ser atualizada e false caso contrário
     */
    private shouldUpdateDistance = (currentVersion: DistanceVersion | undefined) => (
        !currentVersion || currentVersion.value !== DistanceVersionConstants.VERSION
    )
}

export default DataService