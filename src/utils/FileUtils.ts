import Superagent from 'superagent'

class FileUtils {
    /**
     * Realiza uma requisição para ler um arquivo de texto no diretório public
     * @returns string com o texto lido ou null
     */
    readTextFile = async (publicPath: string) => {
        try {
            const response = await Superagent.get(publicPath)
            return response.text
        } catch(e) {}
    }
}

export default new FileUtils()