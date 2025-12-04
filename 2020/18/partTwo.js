const calculate = line => {
    if (line.length === 1) return parseInt(line[0])

    // let multis

    // // do {
    // multis = line.findIndex(x => x === '*')
    // if (multis !== -1) {

    // }
    // // } while ()

    const [first, second, third] = line

    const result = eval([first, second, third].join(' '))

    const newLine = [result, ...line.slice(3)]

    if (newLine.length === 1) return newLine[0]

    return calculate(newLine)
}

const lineToArray = line =>
    line.split(' ')

const doMultiply = line => {
    let match

    do {
        match = /(\d+ \+ \d+)/.exec(line)

        console.log(match)

        if (match) {
            const result = calculate(lineToArray(match[1]))
            line = line.replace(/(\d+ \+ \d+)/, result)
            console.log(line)
        }
    } while (match)

    // console.log(line)

    return calculate(lineToArray(line))
}

const doBrackets = line => {
    let match

    do {
        match = /\(([^\)\(]*)\)/.exec(line)

        if (match) {
            const result = doMultiply(match[1])
            line = line.replace(/\(([^\)\(]*)\)/, result)
            // console.log(line)
        }
    } while (match)

    // console.log(line)

    return doMultiply(line)
}

const partTwo = input => {
    const lines = input.split('\n').filter(x => x)

    const result = lines.map(doBrackets)

    console.log(result)

    return result.reduce((a, x) => a + x)
}

module.exports = partTwo
