import Database from "../storage/Database"
import LoadDataServiceImpl from "./LoadDataService"
import SaveDataServiceImpl from "./SaveDataService"
import CityServiceImpl from "./CityService"
import DistanceServiceImpl from './DistanceService'

const LoadDataService = new LoadDataServiceImpl()

export { LoadDataService }

const SaveDataService = new SaveDataServiceImpl()

export { SaveDataService }

const CityService = new CityServiceImpl(Database.city)

export { CityService }

const DistanceService = new DistanceServiceImpl(Database.distance)

export { DistanceService }