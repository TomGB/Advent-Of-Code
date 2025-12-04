const fs = require('fs')
const partOne = require('./partOne')
const partTwo = require('./partTwo')
const extraCredit = require('./nDimentions')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

console.log({
    partOne: partOne(input),
    partTwo: partTwo(input),
    extraCredit: extraCredit(input),
})
