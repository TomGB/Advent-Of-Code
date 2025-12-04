const moveShip = {
    N: (x, y, sX, sY, num) => [x, y, sX, sY + num],
    S: (x, y, sX, sY, num) => [x, y, sX, sY - num],
    E: (x, y, sX, sY, num) => [x, y, sX + num, sY],
    W: (x, y, sX, sY, num) => [x, y, sX - num, sY],
}

const move = {
    N: (x, y, sX, sY, num) => [x, y + num, sX, sY],
    S: (x, y, sX, sY, num) => [x, y - num, sX, sY],
    E: (x, y, sX, sY, num) => [x + num, y, sX, sY],
    W: (x, y, sX, sY, num) => [x - num, y, sX, sY],
    F: (x, y, sX, sY, num) => {
        do {
            [x, y, sX, sY] = moveShip['N'](x, y, sX, sY, y);
            [x, y, sX, sY] = moveShip['E'](x, y, sX, sY, x);
            // console.log({ sX, sY, num })
            num--
        } while (num > 0)
        return [x, y, sX, sY]
    },
    L: (x, y, sX, sY, num) => {
        let oldX = x, oldY = y
        do {
            x = -oldY
            y = oldX
            num -= 90
            oldX = x
            oldY = y
        } while (num > 0)
        return [x, y, sX, sY]
    },
    R: (x, y, sX, sY, num) => {
        let oldX = x, oldY = y
        do {
            x = oldY
            y = -oldX
            num -= 90
            oldX = x
            oldY = y
        } while (num > 0)
        return [x, y, sX, sY]
    },
}

const partTwo = input => {
    const path = input.map(line => line.match(/(?<dir>.)(?<num>\d+)/).groups).map(({ dir, num }) => ({ dir, num: parseInt(num) }))

    let x = 10
    let y = 1
    let sX = 0
    let sY = 0

    path.map(({ dir, num }) => {
        ;[x, y, sX, sY] = move[dir](x, y, sX, sY, num)
        console.log({ dir, x, y, sX, sY, num })
    })

    return Math.abs(sX) + Math.abs(sY)
}

module.exports = partTwo
