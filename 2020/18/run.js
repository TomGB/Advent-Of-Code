const fs = require('fs')
const partOne = require('./partOne')
const partTwo = require('./partTwo')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

console.log({
    partOne: partOne(input),
    partTwo: partTwo(input),
})
