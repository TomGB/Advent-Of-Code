const neighborLocs = Array.from({ length: 3 * 3 * 3 }, (_, i) => {
    const x = Math.floor(i / (3 * 3)) - 1
    const y = Math.floor(i / 3) % 3 - 1
    const z = i % 3 - 1

    return [x, y, z]
}).filter(([x, y, z]) => !(x === 0 && y === 0 && z === 0))

const partOne = input => {
    const startingGrid = input.split('\n').filter(x => x).map(row => row.split(''))

    const grid = new Map()

    startingGrid.forEach((row, rI) => row.forEach((cell, cI) => {
        if (cell === '#') grid.set([cI, rI, 0].join(), [cI, rI, 0])
    }))

    const countNeighbors = (grid, cx, cy, cz) =>
        neighborLocs.filter(([x, y, z]) =>
            grid.has([cx + x, cy + y, cz + z].join())
        ).length

    const getNeighbors = (cx, cy, cz) =>
        neighborLocs.map(([x, y, z]) =>
            [cx + x, cy + y, cz + z]
        )

    let time = 0

    do {
        const newCells = []
        const deletedCells = []

        const toUpdate = new Map()

        grid.forEach(cell => {
            toUpdate.set(cell.join(), cell)

            getNeighbors(...cell).forEach(neighbor => {
                toUpdate.set(neighbor.join(), neighbor)
            })
        })

        toUpdate.forEach(cell => {
            const count = countNeighbors(grid, ...cell)
            if (![2, 3].includes(count)) deletedCells.push(cell)
            if (count === 3) newCells.push(cell)
        })

        deletedCells.forEach(cell => grid.delete(cell.join()))
        newCells.forEach(cell => grid.set(cell.join(), cell))

        time++
    } while (time < 6)

    return grid.size
}

module.exports = partOne
