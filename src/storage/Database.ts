import Dexie from 'dexie'
import City from '../types/City'
import Cost from '../types/Cost'
import Distance from '../types/Distance'
import DistanceVersion from '../types/DistanceVersion'

const DATABASE_NAME = 'CustoFreteDB'
const DATABASE_VERSION = 1

interface AlternativeDatabase {
    indexedDB: {open: Function}
    IDBKeyRange: {bound: Function, lowerBound: Function, upperBound: Function}
}

/**
 * Cria um banco de dados baseado em indíces utilizando tabelas
 */
class Database extends Dexie {
    city: Dexie.Table<City, number>
    distance: Dexie.Table<Distance, string>
    cost: Dexie.Table<Cost, number>
    distanceVersion: Dexie.Table<DistanceVersion, number>
    
    /**
     * @param indexedDB Banco de dados opcional caso não queira utilizar o padrão
     * @param IDBKeyRange Definição de chaves do banco de dados alternativo
     */
    constructor(alternativeDatabase?: AlternativeDatabase) {
        super(DATABASE_NAME, {...alternativeDatabase})
        
        // Especifica as tabelas e seus indíces
        this.version(DATABASE_VERSION).stores({
            city: '++id',
            distance: '[originId+destinyId]',
            cost: '++id',
            distanceVersion: 'value'
        })

        // Armazena as referências para cada entidade de manipulação das tabelas 
        this.city = this.table('city')
        this.distance = this.table('distance')
        this.cost = this.table('cost')
        this.distanceVersion = this.table('distanceVersion')
    }
}

export { Database }
export default new Database()
