const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(`\n`).filter(x => x)

const seatPositions = input.map(pass => parseInt(pass.replace(/F|L/g, 0).replace(/B|R/g, 1), 2))

const partOne = Math.max(...seatPositions)

seatPositions.sort((a, b) => a - b)

const partTwo = seatPositions.find((pos, i, arr) => arr[i + 1] - pos === 2) + 1

console.log({ partOne, partTwo })
