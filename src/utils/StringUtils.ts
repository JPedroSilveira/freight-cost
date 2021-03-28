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
     * Transforma um número em uma string representando um valor monetário
     * @param value número
     * @returns string formatada
     */
    numberToMoneyString = (value: number) => {
        if (value < 0) value = 0
        const stringValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        return stringValue.substr(3, stringValue.length)
    }

    /**
     * Valida se uma string é vazia ou nula
     * @param str String de entrada
     */
    isEmpty = (str?: string | null) => (
        str === undefined || str === null || str.length === 0 || str.replace(/ /gi, '').length === 0
    )

    /**
     * Remove espaços vazios
     * @param value string de entrada
     * @returns string sem espaços vazios
     */
    removeBlankSpace = (value: string) => {
        return value.replace(/ /gi, '')
    }

    /**
     * Remove uma substring de uma string maior
     * @param value string base
     * @param subtraing substring a ser removida
     * @returns string base sem casos da substring
     */
    removeSubstring = (value: string, subtraing: string) => {
        const regex = new RegExp(subtraing, 'gi')
        return value.replace(regex, '')
    }

    /**
     * Remove valores não numéricos ([0-9], remove '.', '-' e '+') 
     * @param value string base
     * @returns string resultado
     */
    removeNonNumerical = (value: string) => {
        const regex = /([0-9])/g
        const result = value.match(regex)
        return result ? result.join('') : ''
    }

    /**
     * Elimina acentuação de texto
     * @param value string de entrada
     * @returns texto sem acentuação
     */
    removerSpecials = (value: string) => {
        return value.replace(/[ÀÁÂÃÄÅ]/g,"A").replace(/[àáâãäå]/g,"a")
            .replace(/[èéêë]/g,"e").replace(/[ÈÉÊË]/g,"E")
            .replace(/[ìíîï]/g,"i").replace(/[ÌÍÎÏ]/g,"I")
            .replace(/[òóôõö]/g,"o").replace(/[ÒÓÔÕÖ]/g,"O")
            .replace(/[ùúûü]/g,"u").replace(/[ÙÚÛÜ]/g,"U")
            .replace(/[Ç]/g,"C").replace(/[ç]/g,"c")
    }
}

export default new StringUtils()