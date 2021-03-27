import { DistanceVersionService, LoadDataService, SaveDataService } from '../'
import DistanceVersionConstants from '../../constants/DistanceVersionConstants'
import DistanceVersion from '../../types/DistanceVersion'

class DataService {
    /**
     * Verifica e atualiza as informações de distância caso necessário
     * @returns true caso os dados estejam atualizados e false em caso de erro
     */
    verifyDistanceDataUpdate = async (): Promise<boolean> => {
        const currentVersion = await DistanceVersionService.get()

        if (this.shouldUpdateDistance(currentVersion)) {
            const distancesCSV = await LoadDataService.loadDistances()
            if (distancesCSV) {
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
     * Avalia se a versão das informações deve atualizar baseado na versão atual
     * @param currentVersion Versão atual
     * @returns true se a versão deve ser atualizada e false caso contrário
     */
    private shouldUpdateDistance = (currentVersion: DistanceVersion | undefined) => (
        !currentVersion || currentVersion.value !== DistanceVersionConstants.VERSION
    )
}

export default DataService