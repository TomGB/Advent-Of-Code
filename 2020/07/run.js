const fs = require('fs')
const countBags = require('./countBags')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(`\n`).filter(x => x)
console.log(countBags(input))
