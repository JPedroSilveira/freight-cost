import { CityService, DistanceService, LoadDataService, SaveDataService } from '../../../services'
import City from '../../../types/City'
import Distance from '../../../types/Distance'

jest.mock("../../../storage/Database.ts")
jest.mock("../../../services/data/LoadDataService.ts")

beforeEach(done => {
    CityService.deleteAll().then(() => 
        DistanceService.deleteAll().then(() => done())
    )
})

test('all cities from load data are saved', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    expect(cities.length).toBe(24)
})

test('all cities from load data are saved with right name', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    expect(cities.find(item => item.name === 'ARACAJU')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'BELEM')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'BELO HORIZONTE')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'BRASILIA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'CAMPO GRANDE')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'CUIABA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'CURITIBA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'FLORIANOPOLIS')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'FORTALEZA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'GOIANIA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'JOAO PESSOA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'MACEIO')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'MANAUS')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'NATAL')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'PORTO ALEGRE')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'PORTO VELHO')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'RECIFE')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'RIO BRANCO')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'RIO DE JANEIRO')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'SALVADOR')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'SAO LUIS')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'SAO PAULO')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'TERESINA')).not.toBe(undefined)
    expect(cities.find(item => item.name === 'VITORIA')).not.toBe(undefined)
})

test('all distances of first city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[0] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 294, 356, 501, 611, 788, 1142, 1183, 1408, 1578, 1578, 1652, 1848, 1855, 2079, 2187, 2595, 2765, 2775, 2892, 3296, 4230, 4763, 5215]

    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of second city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[1] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 806, 947, 1610, 2017, 2074, 2079, 2100, 2108, 2120, 2161, 2173, 2824, 2933, 2941, 2942, 3108, 3193, 3250, 3500, 3852, 4397, 4931, 5298]

    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of third city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[2] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 434, 524, 586, 716, 906, 1004, 1301, 1372, 1453, 1578, 1594, 1712, 1854, 2061, 2171, 2302, 2348, 2528, 2738, 2824, 3050, 3584, 3951]

    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of fourth city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[3] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 209, 741, 1015, 1133, 1134, 1148, 1239, 1366, 1446, 1650, 1673, 1789, 1930, 2027, 2135, 2140, 2157, 2200, 2245, 2422, 2589, 3123, 3490]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of fifth city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[4] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 694, 935, 991, 1014, 1134, 1298, 1444, 1453, 1518, 1892, 2150, 2568, 2684, 2764, 2911, 2942, 2979, 3040, 3051, 3247, 3357, 3407, 3534]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of sixth city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const cuiaba = cities[5] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: cuiaba.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 694, 934, 1133, 1456, 1594, 1614, 1679, 1986, 1990, 2017, 2119, 2206, 2357, 2566, 2773, 2910, 2941, 2978, 3049, 3255, 3366, 3406, 3543]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of seventh city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[6] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 300, 408, 711, 852, 991, 1004, 1186, 1300, 1366, 1679, 2385, 2595, 2871, 3078, 3135, 3143, 3188, 3193, 3230, 3365, 3541, 3669, 4036]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of eighth city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[7] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 300, 476, 705, 1144, 1298, 1301, 1493, 1597, 1673, 1986, 2682, 2892, 3168, 3375, 3442, 3450, 3485, 3500, 3537, 3662, 3838, 3976, 4443]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of twenty-second city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[21] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 408, 429, 586, 705, 882, 926, 1014, 1015, 1109, 1614, 1962, 2188, 2453, 2660, 2770, 2792, 2933, 2947, 2970, 3070, 3127, 3604, 3971]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})

test('all distances of last city from load data are saved with right values', async () => {
    const data = await LoadDataService.loadDistances()

    if (data) {
        await SaveDataService.saveDistances(data)
    }

    const cities = (await CityService.getAll()) as City[] 

    const originCity = cities[23] 

    const search = cities.map(async city => {
        return DistanceService.getByOriginAndDestiny({
            originId: originCity.id!,
            destinyId: city.id!
        })
    }) as Promise<Distance>[]

    const distances = await Promise.all(search)

    const values = [0, 521, 524, 882, 1202, 1238, 1300, 1408, 1428, 1597, 1684, 1891, 1892, 2001, 2001, 2119, 2171, 2178, 2397, 2607, 3108, 3575, 4109, 4476]
    
    distances.sort((a,b) => a.value > b.value ? 1 : -1)
        .forEach((distance, index) => expect(distance.value).toBe(values[index]))
})