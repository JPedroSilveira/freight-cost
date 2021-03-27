import StringUtils from '../../utils/StringUtils'

test('split by line a string with one line break', async () => {
    const result = StringUtils.splitByLine('teste \n teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste ')
    expect(result![1]).toEqual(' teste')
})

test('split by line a string with two line breaks', async () => {
    const result = StringUtils.splitByLine('teste \n teste \n teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste ')
    expect(result![1]).toEqual(' teste ')
    expect(result![2]).toEqual(' teste')
})

test('split by line a string with two r line break', async () => {
    const result = StringUtils.splitByLine('teste \r teste \r teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste ')
    expect(result![1]).toEqual(' teste ')
    expect(result![2]).toEqual(' teste')
})

test('split by line a empty string', async () => {
    const result = StringUtils.splitByLine('')
    expect(result).toBeNull()
})

test('split by line a string without line break', async () => {
    const result = StringUtils.splitByLine('teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste')
})

test('split by line and stay in order', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByLine('1\n2\n3\n4\n5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('1')
        expect(result![1]).toEqual('2')
        expect(result![2]).toEqual('3')
        expect(result![3]).toEqual('4')
        expect(result![4]).toEqual('5')
    }
})

test('split by line and stay in order using r', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByLine('1\r2\r3\r4\r5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('1')
        expect(result![1]).toEqual('2')
        expect(result![2]).toEqual('3')
        expect(result![3]).toEqual('4')
        expect(result![4]).toEqual('5')
    }
})

test('split by line string with empy line using r', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByLine('1\r\r3\r\r5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('1')
        expect(result![1]).toEqual('3')
        expect(result![2]).toEqual('5')
    }
})

test('split by line string with empy line at start using r', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByLine('\r\r3\r\r5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('3')
        expect(result![1]).toEqual('5')
    }
})

test('split by line string with empy line using n', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByLine('1\n\n3\n\n5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('1')
        expect(result![1]).toEqual('3')
        expect(result![2]).toEqual('5')
    }
})

test('split by line string with empy line at start using n', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByLine('\n\n3\n\n5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('3')
        expect(result![1]).toEqual('5')
    }
})

test('split by dot comma a string with none', async () => {
    const result = StringUtils.splitByDotComma('teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste')
})

test('split by dot comma a string with one', async () => {
    const result = StringUtils.splitByDotComma('teste;')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste')
    expect(result![1]).toEqual('')
})

test('split by dot comma a string with two', async () => {
    const result = StringUtils.splitByDotComma('teste;teste')
    expect(result).not.toBeNull()
    expect(result![0]).toEqual('teste')
    expect(result![1]).toEqual('teste')
})

test('split by dot comma an empty string', async () => {
    const result = StringUtils.splitByDotComma('')
    expect(result).toBeNull()
})

test('split by dot comma and stay in order', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByDotComma('1;;3;4;5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('1')
        expect(result![1]).toEqual('')
        expect(result![2]).toEqual('3')
        expect(result![3]).toEqual('4')
        expect(result![4]).toEqual('5')
    }
})


test('split by dot comma string with empy element', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByDotComma('1;;3;;5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('1')
        expect(result![1]).toEqual('')
        expect(result![2]).toEqual('3')
        expect(result![3]).toEqual('')
        expect(result![4]).toEqual('5')
    }
})

test('split by dot comma string with empy element at start', async () => {
    for (let x = 0; x < 20; x++) {
        const result = StringUtils.splitByDotComma(';;3;;5')
        expect(result).not.toBeNull()
        expect(result![0]).toEqual('')
        expect(result![1]).toEqual('')
        expect(result![2]).toEqual('3')
        expect(result![3]).toEqual('')
        expect(result![4]).toEqual('5')
    }
})

test('detect empty string', async () => {
    const result = StringUtils.isEmpty('')
    expect(result).toBe(true)
})

test('detect null string', async () => {
    const result = StringUtils.isEmpty(null)
    expect(result).toBe(true)
})

test('detect undefined string', async () => {
    const result = StringUtils.isEmpty(undefined)
    expect(result).toBe(true)
})

test('detect not empty string', async () => {
    const result = StringUtils.isEmpty('not empty')
    expect(result).toBe(false)
})

test('detect not empty string', async () => {
    const result = StringUtils.isEmpty('not empty')
    expect(result).toBe(false)
})

test('detect empty string with multiple empty spaces', async () => {
    const result = StringUtils.isEmpty('    ')
    expect(result).toBe(true)
})