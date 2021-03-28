import Database from "../storage/Database"
import LoadDataServiceImpl from "./data/LoadDataService"
import SaveDataServiceImpl from "./data/SaveDataService"
import DataServiceImpl from  "./data/DataService"
import CityServiceImpl from "./CityService"
import DistanceServiceImpl from './DistanceService'
import CostServiceImpl from './CostService'
import PathServiceImpl from './PathService'
import DistanceVersionServiceImpl from './DistanceVersionService'

const LoadDataService = new LoadDataServiceImpl()

export { LoadDataService }

const SaveDataService = new SaveDataServiceImpl()

export { SaveDataService }

const CityService = new CityServiceImpl(Database.city)

export { DataService }

const DataService = new DataServiceImpl()


export { CityService }

const DistanceService = new DistanceServiceImpl(Database.distance)

export { DistanceService }

const CostService = new CostServiceImpl(Database.cost)

export { CostService }

const PathService = new PathServiceImpl()

export { PathService }

const DistanceVersionService = new DistanceVersionServiceImpl(Database.distanceVersion)

export { DistanceVersionService }
