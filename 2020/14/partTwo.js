require = require("esm")(module)
const fs = require('fs')
const { PowerSet } = require('js-combinatorics')

const partTwo = input => {
    const blocks = input.split('mask = ').map(block => {
        const [mask, ...memsText] = block.split('\n').filter(x => x)

        const mems = memsText.map(mem => mem.match(/mem\[(?<i>\d+)\] = (?<v>\d+)/).groups)
        return { mask, mems }
    }).filter(({ mask }) => mask)

    const memory = {}

    blocks.forEach(({ mask, mems }) => {
        const orMask = mask.replace(/X|0/g, '0')
        const bigOrMask = BigInt('0b' + orMask)

        const flips = [...mask.matchAll(/X/g)]
            .map(match => BigInt(mask.length - 1 - match.index))
            .map(x => 1n << x)

        const flipPowerSet = [...new PowerSet(flips)]

        mems.forEach(({ i, v }) => {
            const bin = BigInt('0b' + (i >>> 0).toString(2))
            const maskedIndex = bin | bigOrMask
            const indexes = flipPowerSet.map((flips) => flips.reduce((a, flip) => a ^ flip, maskedIndex))
            indexes.forEach(i => {
                memory[i] = parseInt(v)
            })
        })
    })

    return Object.values(memory).reduce((a, x) => a + x)
}

module.exports = partTwo
