import ShortPath from "./ShortPath"

interface Path {
    shortPaths: ShortPath[]
    totalCost: number
    totalDistance: number
    totalFuel: number
    totalDays: number
}

export default Path