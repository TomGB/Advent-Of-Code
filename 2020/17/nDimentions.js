const getNeighborOffsets = numDimentions =>
    Array(Math.pow(3, numDimentions)).fill().map((_, i) =>
        Array(numDimentions).fill().map((_, di) =>
            Math.floor(i / Math.pow(3, di)) % 3 - 1
        )
    ).filter(dims => !dims.every(v => v === 0)) // remove the center location

const countNeighbors = (grid, neighbors) =>
    neighbors.filter(dims =>
        grid.has(dims.join())
    ).length

const setupGetNeighbors = (numDimentions) => {
    const neighborLocs = getNeighborOffsets(numDimentions)
    return currentLoc =>
        neighborLocs.map(dims =>
            dims.map((d, di) => currentLoc[di] + d)
        )
}

const nDimentions = (input, numDimentions = 4, numCycles = 6) => {
    const getNeighbors = setupGetNeighbors(numDimentions)

    const grid = new Map()
    const padding = Array(numDimentions - 2).fill(0)

    const startingGrid = input.split('\n').filter(x => x).map(row => row.split(''))

    startingGrid.forEach((row, rI) => row.forEach((cell, cI) => {
        const location = [cI, rI, ...padding]
        if (cell === '#') grid.set(location.join(), location)
    }))

    let time = 0

    do {
        const newCells = [], deletedCells = []
        const toUpdate = new Map()

        grid.forEach(cell => {
            toUpdate.set(cell.join(), cell)

            getNeighbors(cell).forEach(neighbor => {
                toUpdate.set(neighbor.join(), neighbor)
            })
        })

        toUpdate.forEach(cell => {
            const count = countNeighbors(grid, getNeighbors(cell))

            if (![2, 3].includes(count)) deletedCells.push(cell)

            if (count === 3) newCells.push(cell)
        })

        deletedCells.forEach(cell => grid.delete(cell.join()))
        newCells.forEach(cell => grid.set(cell.join(), cell))

        time++
    } while (time < numCycles)

    return grid.size
}

module.exports = nDimentions
