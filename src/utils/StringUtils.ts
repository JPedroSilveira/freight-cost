class StringUtils {
    splitByLine = (str: string) => {
        return str.match(/[^\r\n]+/g)
    }
}

export default new StringUtils()