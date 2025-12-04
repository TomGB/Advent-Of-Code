const partOne = input => {
    let [next, ...series] = input.split(',').map(x => parseInt(x)).reverse()
    let turn = series.length

    do {
        const index = series.findIndex(x => x === next)
        series.unshift(next)

        if (index === -1) next = 0
        else next = index + 1

        turn++
    } while (turn < 2020)

    return series[0]
}

module.exports = partOne
