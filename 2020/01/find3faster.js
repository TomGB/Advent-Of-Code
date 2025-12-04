require = require("esm")(module)
const fs = require('fs')
const { Combination } = require('js-combinatorics')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map(x => Number.parseInt(x)).filter(x => x)
const min = Math.min(...input)
const max = Math.max(...input)

const combs = new Combination(input, 2)
const sumsWithR = [...combs].map(([a, b]) => ({ a, b, r: 2020 - (a + b) }))
const sumsWithinBounds = sumsWithR.filter(({ r }) => r >= min && r <= max)

let c

const { a, b } = sumsWithinBounds.find(({ r }) => {
    c = input.find(x => x === r)
    return c
})

console.log(a * b * c)
