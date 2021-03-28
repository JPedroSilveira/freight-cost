import { CostService as RealCostService } from '../'
import Cost from '../../types/Cost'

jest.unmock('../CostService')

class CostService {
    private cost: Cost = {
        value: 5.23
    }

    get = async () => {
        return this.cost
    }

    save = async (entity: Cost) => {
        if (this.isValid(entity)[0]) {
            this.cost = entity
            return true
        }
        return false
    }

    isValid = (entity: Cost) => {
        return RealCostService.isValid(entity)
    }
}

export default CostService