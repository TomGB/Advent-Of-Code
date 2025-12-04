const partOne = input => {
    const sorted = input.sort((a, b) => a - b)

    sorted.unshift(0)
    sorted.push(sorted[sorted.length - 1] + 3)


    const diffs = []

    for (let index = 0; index < sorted.length - 1; index++) {
        const a = sorted[index]
        const b = sorted[index + 1]

        const diff = b - a

        diffs.push(diff)
    }

    const oneDiffs = diffs.filter(x => x === 1).length
    // console.log(diffs.filter(x => x === 2).length)
    const threeDifs = diffs.filter(x => x === 3).length

    return oneDiffs * threeDifs
}

module.exports = partOne
