import { Database } from '../Database'
import fakeIndexedDb from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'

jest.unmock('../Database')

export { Database }

// Exporta banco de dados em memória para testes
export default new Database({ indexedDB: fakeIndexedDb, IDBKeyRange: IDBKeyRange }) 