const partTwo = input => {
    const getNext = (startValue, head) => {
        const nextHeads = []

        const a = input[head + 1]
        const b = input[head + 2]
        const c = input[head + 3]

        if (a - startValue <= 3) nextHeads.push(head + 1)
        if (b - startValue <= 3) nextHeads.push(head + 2)
        if (c - startValue <= 3) nextHeads.push(head + 3)

        return nextHeads
    }

    const possibleSteps = input.map(getNext).map(options => ({ options }))

    const getCombinations = index => {
        const { options, count } = possibleSteps[index]

        if (count) return count

        if (options.length === 0) { //the last one
            possibleSteps[index].count = 1
            return 1
        }

        possibleSteps[index].count = options.map(getCombinations).reduce((a, b) => a + b)

        return possibleSteps[index].count
    }

    return getCombinations(0)
}

module.exports = partTwo
