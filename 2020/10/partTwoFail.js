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

    const possibleSteps = input.map(getNext)

    const getCombinations = nextIndex => {
        const options = possibleSteps[nextIndex]

        const paths = options.flatMap(getCombinations)

        return paths.length !== 0 ? paths : 1
    }

    return getCombinations(0).length
}

module.exports = partTwo
