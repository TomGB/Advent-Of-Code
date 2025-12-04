const getOccupied = (grid, x, y) => ([dX, dY]) => {
    try {
        return grid[x + dX][y + dY] === '#'
    } catch (e) { }
}

const neighborsOffset = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [+1, -1],
    [+1, 0],
    [+1, 1],
]

const match = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const partOne = grid => {

    const newGrid = Array.from({ length: grid.length }, () => [])

    grid.forEach((row, x) => row.forEach((seat, y) => {
        const neighbors = neighborsOffset.filter(getOccupied(grid, x, y)).length

        if (seat === '.') return newGrid[x][y] = '.'

        if (seat === 'L' && neighbors === 0) return newGrid[x][y] = '#'

        if (seat === '#' && neighbors >= 4) return newGrid[x][y] = 'L'

        return newGrid[x][y] = seat
    }))

    if (match(grid, newGrid)) return newGrid.flatMap(x => x).filter(x => x === '#').length
    else return partOne(newGrid)
}

module.exports = partOne
