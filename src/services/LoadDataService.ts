import Superagent from 'superagent'

class LoadDataService {
    loadDistances = async () => {
        const data = await this.getDistancesCSV()

        if (data) {
            const dataArray = this.splitCSVByLine(data)
            console.log(dataArray)
        }
        

        return
    }

    private getDistancesCSV = async() => {
        try {
            const response = await Superagent.get('./data/distancias.csv')
            return response.text
        } catch(e) {}
    }

    private splitCSVByLine = (csv: string) => {
        return csv.match(/[^\r\n]+/g)
    }
}

export default new LoadDataService()