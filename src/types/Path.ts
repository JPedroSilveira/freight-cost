interface PathItem {
    originCity: string
    destinyCity: string
    distanceInKM: number
}

interface Path {
    items: PathItem[]
    totalCost: number
    totalDistanceInKM: number
    totalFuel: number
    totalDays: number
}

export default Path