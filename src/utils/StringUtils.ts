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
     * Transforma um número em uma string representando um valor em reais
     * @param value número
     * @returns string formatada dee acordo com a moeda Real no Brasil
     */
    numberToReais = (value: number) => {
        if (value < 0) value = 0
        const stringValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        return `R$ ${stringValue.substr(3, stringValue.length)}`
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