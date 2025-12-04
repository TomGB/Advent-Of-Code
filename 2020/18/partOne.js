const calculate = line => {
    // console.log(line)
    if (line.length === 1) return line[0]

    const [first, second, third] = line

    const result = eval([first, second, third].join(' '))

    const newLine = [result, ...line.slice(3)]

    if (newLine.length === 1) return newLine[0]

    return calculate(newLine)
}

const lineToArray = line =>
    line.split(' ')

const findBrackets = line => {
    let match

    do {
        match = /\(([^\)\(]*)\)/.exec(line)

        if (match) {
            const result = calculate(lineToArray(match[1]))
            line = line.replace(/\(([^\)\(]*)\)/, result)
            // console.log(line)
        }
    } while (match)

    // console.log(line)

    return calculate(lineToArray(line))
}

const partOne = input => {
    const lines = input.split('\n').filter(x => x)

    const result = lines.map(findBrackets)

    console.log(result)

    return result.reduce((a, x) => a + parseInt(x))
}

module.exports = partOne
