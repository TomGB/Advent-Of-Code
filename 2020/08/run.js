const fs = require('fs')
const clone = input => JSON.parse(JSON.stringify(input))

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').filter(x => x)

const originalProgram = input.map((line, index) => {
    const [op, val] = line.split(' ')
    return { op, val: parseInt(val), line: index }
})

const runProgram = program => {
    let head = 0
    let acc = 0

    const visitedLines = []

    const logic = {
        nop: () => head++,
        acc: val => { acc += val; head++ },
        jmp: val => head += val
    }

    do {
        visitedLines.push(head)
        const { op, val } = program[head]

        logic[op](val)

        if (head >= program.length) return { state: 'end', acc }
    } while (!visitedLines.includes(head))

    return { state: 'loop', acc }
}

const partOne = runProgram(originalProgram).acc

// Part Two

const nops = originalProgram.filter(({ op }) => op === 'nop')
const jmps = originalProgram.filter(({ op }) => op === 'jmp')

const modifyLine = (originalProgram, newOp) => ({ line }) => {
    const newProgram = clone(originalProgram)
    newProgram[line].op = newOp
    return newProgram
}

const newPrograms = [
    ...nops.map(modifyLine(originalProgram, 'jmp')),
    ...jmps.map(modifyLine(originalProgram, 'nop')),
]

const partTwo = newPrograms.map(runProgram).find(({ state }) => state === 'end').acc

console.log({ partOne, partTwo })
