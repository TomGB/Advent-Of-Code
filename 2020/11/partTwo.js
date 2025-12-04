const getNextOccupied = (grid, x, y) => ([dX, dY]) => {
    let currentX = x + dX, currentY = y + dY

    while (currentX >= 0 && currentX < grid.length && currentY >= 0 && currentY < grid[0].length) {
        const seat = grid[currentX][currentY]

        if (seat === 'L') return false
        if (seat === '#') return true

        currentX += dX
        currentY += dY
    }
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

const partTwo = grid => {

    const newGrid = Array.from({ length: grid.length }, () => [])

    grid.forEach((row, x) => row.forEach((seat, y) => {
        const neighbors = neighborsOffset.filter(getNextOccupied(grid, x, y)).length

        if (seat === '.') return newGrid[x][y] = '.'

        if (seat === 'L' && neighbors === 0) return newGrid[x][y] = '#'

        if (seat === '#' && neighbors >= 5) return newGrid[x][y] = 'L'

        return newGrid[x][y] = seat
    }))

    // newGrid.map(row => console.log(row.join('')))
    // console.log('')

    if (match(grid, newGrid)) return newGrid.flatMap(x => x).filter(x => x === '#').length
    else return partTwo(newGrid)
}

module.exports = partTwo
