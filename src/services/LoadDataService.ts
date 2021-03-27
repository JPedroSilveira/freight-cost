import FileUtils from "../utils/FileUtils"

const DISTANCE_FILE = '/data/distance.csv'

class LoadDataService {
    /**
     * Realiza a leitura do arquivo CSV e retorna seu conteúdo
     * @returns string o conteúdo do CSV ou undefined
     */
    loadDistances = async () => {
        return FileUtils.readTextFile(DISTANCE_FILE)
    }
}

export default LoadDataService