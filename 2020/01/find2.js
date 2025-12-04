require = require("esm")(module)
const fs = require('fs')
const { Combination } = require('js-combinatorics')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map(x => Number.parseInt(x))
const combs = new Combination(input, 2)
const sums = [...combs].map(([a, b]) => ({ a, b, sum: a + b }))
const { a, b } = sums.find(({ sum }) => sum === 2020)
console.log(a * b)
