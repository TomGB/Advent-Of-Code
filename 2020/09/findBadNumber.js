require = require("esm")(module)
const { Combination } = require('js-combinatorics')

module.exports = ({ input, preambleLength }) => {
    const preamble = input.slice(0, preambleLength)
    const numbers = input.slice(preambleLength)

    let sums = [...new Combination(preamble, 2)].map(([a, b]) => ({ a, b, sum: a + b }))

    const partOne = numbers.find((num) => {
        if (!sums.map(({ sum }) => sum).includes(num)) return true

        const removed = preamble.shift()
        sums = sums.filter(({ a, b }) => ![a, b].includes(removed))
        sums.push(...preamble.map(otherNum => ({ a: otherNum, b: num, sum: otherNum + num })))
        preamble.push(num)
    })

    const partTwo = () => {
        let size = 3
        do {
            for (let index = 0; index < input.length - size + 1; index++) {
                const toSum = input.slice(index, index + size)
                const sum = toSum.reduce((a, x) => a + x)

                if (sum === partOne) return Math.max(...toSum) + Math.min(...toSum)
            }
            size++
        } while (true)
    }

    console.log({
        partOne,
        partTwo: partTwo()
    })
}
