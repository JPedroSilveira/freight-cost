class SortUtils {
    alphabetically = (a: string, b: string): number => {
        if(a < b)  return -1
        if(a > b)  return 1
        return 0;
    }
}

export default new SortUtils()