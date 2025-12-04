const fs = require('fs')

const partOne = require('./partOne')
const partTwo = require('./partTwo')

const input = fs.readFileSync(`${__dirname}/testInput.txt`, 'utf8').split('\n').filter(x => x).map(x => parseInt(x))

console.log({
    partOne: partOne(input),
    partTwo: partTwo(input),
    partTwoExpected: 19208
})
