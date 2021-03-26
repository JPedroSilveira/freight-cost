import StringUtils from '../../utils/StringUtils'

test('split string with one line break', async () => {
    const result = StringUtils.splitByLine('teste \n teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste ')
    expect(result![1]).toEqual(' teste')
})

test('split string with two line breaks', async () => {
    const result = StringUtils.splitByLine('teste \n teste \n teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste ')
    expect(result![1]).toEqual(' teste ')
    expect(result![2]).toEqual(' teste')
})

test('split string with two r line break', async () => {
    const result = StringUtils.splitByLine('teste \r teste \r teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste ')
    expect(result![1]).toEqual(' teste ')
    expect(result![2]).toEqual(' teste')
})

test('split empty string', async () => {
    const result = StringUtils.splitByLine('')
    expect(result).toBeNull()
})

test('split string without line break', async () => {
    const result = StringUtils.splitByLine('teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste')
})