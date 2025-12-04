const replace = (mask, from, to) => BigInt(parseInt(mask.replace(from, to), 2))

const partOne = input => {
    const blocks = input.split('mask = ').map(block => {
        const [mask, ...memsText] = block.split('\n').filter(x => x)

        const mems = memsText.map(mem => mem.match(/mem\[(?<i>\d+)\] = (?<v>\d+)/).groups)
        return { mask, mems }
    }).filter(({ mask }) => mask)

    const memory = {}

    blocks.forEach(({ mask, mems }) => {
        const orMask = replace(mask, /X|0/g, '0')
        const andMask = replace(mask, /X|1/g, '1')

        mems.forEach(({ i, v }) =>
            memory[i] = BigInt(v) | orMask & andMask
        )
    })

    return Object.values(memory).reduce((a, x) => a + x)
}

module.exports = partOne
