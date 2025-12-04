const neighborLocs = Array.from({ length: 3 * 3 * 3 * 3 }, (_, i) => {
    const w = Math.floor(i / (3 * 3 * 3)) - 1
    const x = Math.floor(i / (3 * 3)) % 3 - 1
    const y = Math.floor(i / 3) % 3 - 1
    const z = i % 3 - 1

    return [x, y, z, w]
}).filter(([x, y, z, w]) => !(x === 0 && y === 0 && z === 0 && w === 0))

const countNeighbors = (grid, cx, cy, cz, cw) =>
    neighborLocs.filter(([x, y, z, w]) =>
        grid.has([cx + x, cy + y, cz + z, cw + w].join())
    ).length


const getNeighbors = (cx, cy, cz, cw) =>
    neighborLocs.map(([x, y, z, w]) =>
        [cx + x, cy + y, cz + z, cw + w]
    )

const partTwo = input => {
    const startingGrid = input.split('\n').filter(x => x).map(row => row.split(''))

    const grid = new Map()

    startingGrid.forEach((row, rI) => row.forEach((cell, cI) => {
        if (cell === '#') grid.set([cI, rI, 0, 0].join(), [cI, rI, 0, 0])
    }))

    let time = 0

    do {
        const newCells = [], deletedCells = []
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

module.exports = partTwo
