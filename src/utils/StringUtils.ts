class StringUtils {
    /**
     * Transforma uma string em um vetor utilizando quebra de linha como separador
     * @param str String de entrada
     * @returns vetor ou nulo em caso de entrada vazia
     */
    splitByLine = (str: string) => {
        return str.match(/[^\r\n]+/g)
    }

    /**
     * Transforma uma string em um vetor utilizando o caractere ';' como separador
     * @param str String de entrada
     * @returns vetor ou nulo em caso de entrada vazia
     */
    splitByDotComma = (str: string) => {
        if (str.length === 0) return null
        return str.split(';')
    }

    /**
     * Valida se uma string é vazia ou nula
     * @param str String de entrada
     */
    isEmpty = (str?: string | null) => (
        str === undefined || str === null || str.length === 0 || str.replace(/ /gi, '').length === 0
    )
}

export default new StringUtils()