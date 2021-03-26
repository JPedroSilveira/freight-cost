import Superagent from 'superagent'

class LoadDataService {
    loadDistances = async () => {
        return this.getDistancesCSV()
    }

    private getDistancesCSV = async() => {
        try {
            const response = await Superagent.get('/data/distances.csv')
            return response.text
        } catch(e) {}
    }
}

export default new LoadDataService()