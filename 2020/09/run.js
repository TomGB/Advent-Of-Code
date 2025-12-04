const fs = require('fs')
const findBadNumber = require('./findBadNumber')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').filter(x => x).map(x => parseInt(x))

const preambleLength = 25

findBadNumber({ input, preambleLength })
