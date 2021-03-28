class SleepUtils {
    inMs = async (ms: number) => {
        await this.sleep(ms)
    }

    inSec = async (min: number) => {
        await this.sleep(min * 1000)
    }

    inMin = async (min: number) => {
        await this.sleep(min * 60000)
    }

    private sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default new SleepUtils()