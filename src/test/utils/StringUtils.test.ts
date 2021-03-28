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

test('numberToReais with zero value', async () => {
    const result = StringUtils.numberToMoneyString(0)
    expect(result).toBe("0,00")
})

test('numberToReais with usual value', async () => {
    const result = StringUtils.numberToMoneyString(23.65)
    expect(result).toBe("23,65")
})

test('numberToReais with not rounded value (to floor)', async () => {
    const result = StringUtils.numberToMoneyString(23.6523)
    expect(result).toBe("23,65")
})

test('numberToReais with not rounded value (to ceil)', async () => {
    const result = StringUtils.numberToMoneyString(23.6573)
    expect(result).toBe("23,66")
})

test('numberToReais with negative value', async () => {
    const result = StringUtils.numberToMoneyString(-23)
    expect(result).toBe("0,00")
})

test('removeBlankSpace with empty string', async () => {
    const value = ''
    const result = StringUtils.removeBlankSpace(value)
    expect(result).toBe('')
})

test('removeBlankSpace with one blank space', async () => {
    const value = ' '
    const result = StringUtils.removeBlankSpace(value)
    expect(result).toBe('')
})

test('removeBlankSpace with three blank spaces', async () => {
    const value = 'a 323 21sa '
    const result = StringUtils.removeBlankSpace(value)
    expect(result).toBe('a32321sa')
})

test('removeBlankSpace starting with blank space', async () => {
    const value = ' a323 21sd a'
    const result = StringUtils.removeBlankSpace(value)
    expect(result).toBe('a32321sda')
})

test('removeSubstring with ;', async () => {
    const value = '323;21;;sda;'
    const result = StringUtils.removeSubstring(value, ';')
    expect(result).toBe('32321sda')
})

test('removeSubstring with ;; (substring of size 2)', async () => {
    const value = '323;21;;sda;'
    const result = StringUtils.removeSubstring(value, ';;')
    expect(result).toBe('323;21sda;')
})

test('removeSubstring with three characters', async () => {
    const value = '32aba322sdaaba'
    const result = StringUtils.removeSubstring(value, 'aba')
    expect(result).toBe('32322sda')
})

test('removeSubstring with empty string as substring', async () => {
    const value = '32aba322sdaaba'
    const result = StringUtils.removeSubstring(value, '')
    expect(result).toBe('32aba322sdaaba')
})

test('removeSubstring with empty string as string', async () => {
    const value = ''
    const result = StringUtils.removeSubstring(value, 'a')
    expect(result).toBe('')
})

test('removeSubstring with empty string in both sides', async () => {
    const value = ''
    const result = StringUtils.removeSubstring(value, '')
    expect(result).toBe('')
})

test('removeNonNumerical with empty string', async () => {
    const value = ''
    const result = StringUtils.removeNonNumerical(value)
    expect(result).toBe('')
})

test('removeNonNumerical with random characters', async () => {
    const value = 'Kvm5=!rcqsX3*kphfC88MYCva37+n6q&XAhNJaFEnsPO27*s%!qnAoBZ3qfPSDqZRBy*=2fAE7Ot&CjY0q2qwq&6H2oWWZNn7*gKsad.adjio^2q´~ ´; ; ~[ ~] \'das 34 . 00' 
    const result = StringUtils.removeNonNumerical(value)
    expect(result).toBe('5388376273270262723400')
})

test('removerSpecials with all special characters', async () => {
    const value = 'ÂâÊêÔôÎîÛûÃãÕõÁáÉéÍíÓóÚúÀàÈèÌìÒòÙùÇç' 
    const result = StringUtils.removerSpecials(value)
    expect(result).toBe('AaEeOoIiUuAaOoAaEeIiOoUuAaEeIiOoUuCc')
})






