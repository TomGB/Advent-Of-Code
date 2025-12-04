const fs = require('fs')
const partOne = require('./partOne')
const partTwo = require('./partTwo')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').filter(x => x).map(row => row.split(''))

console.log({
    partOne: partOne(input),
    partTwo: partTwo(input),
})
