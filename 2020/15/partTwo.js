const partTwo = input => {
    const series = input.split(',').map(x => parseInt(x))

    let next = series.pop()
    let turn = series.length

    const lastSeen = new Map(series.map((v, i) => [v, i]))

    do {
        const index = lastSeen.get(next)

        lastSeen.set(next, turn)

        next = isNaN(index) ? 0 : turn - index

        turn++
    } while (turn < 30000000 - 1)

    return next
}

module.exports = partTwo
