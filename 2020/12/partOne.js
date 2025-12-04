const rotateLeft = {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N'
}

const rotateRight = {
    N: 'E',
    W: 'N',
    S: 'W',
    E: 'S'
}

const move = {
    N: (x, y, h, num) => [x, y + num, h],
    S: (x, y, h, num) => [x, y - num, h],
    E: (x, y, h, num) => [x + num, y, h],
    W: (x, y, h, num) => [x - num, y, h],
    F: (x, y, h, num) => move[h](x, y, h, num),
    L: (x, y, h, num) => {
        do {
            h = rotateLeft[h]
            num -= 90
        } while (num > 0)
        return [x, y, h]
    },
    R: (x, y, h, num) => {
        do {
            h = rotateRight[h]
            num -= 90
        } while (num > 0)
        return [x, y, h]
    },
}

const partOne = input => {
    const path = input.map(line => line.match(/(?<dir>.)(?<num>\d+)/).groups).map(({ dir, num }) => ({ dir, num: parseInt(num) }))

    let x = 0
    let y = 0
    let h = 'E'

    path.map(({ dir, num }) => {
        ;[x, y, h] = move[dir](x, y, h, num)
    })

    console.log(x, y, h)

    return Math.abs(x) + Math.abs(y)
}

module.exports = partOne
