const fs = require('fs')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').filter(x => x)

const grid = input.map(row => row.split(''))

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]

const countTrees = ([x, y]) => {
    let posX = 0, posY = 0, treeCount = 0

    do {
        if (grid[posY][posX] === '#') treeCount++
        posX = (posX + x) % grid[0].length
        posY += y
    } while (posY < grid.length)

    return treeCount
}

const treeCounts = slopes.map(countTrees)
const multiplied = treeCounts.reduce((a, c) => a * c)

console.log({ partOne: treeCounts[1], partTwo: multiplied })
