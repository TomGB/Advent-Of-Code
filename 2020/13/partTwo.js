const gcd = (a, b) => !b ? a : gcd(b, a % b)
const lcm = (a, b) => a * b / gcd(a, b)

const partTwo = input => {
    const [, buses] = input
    const busTimes = buses.split(',').map((x, i) => ({ x: parseInt(x), i })).filter(({ x }) => x)

    let time = 0
    let offset = 1

    busTimes.forEach(({ x: busTime, i: index }) => {
        do {
            if ((time + index) % busTime === 0) {
                offset = lcm(offset, busTime)
                return true
            }
            time += offset
        } while (true)
    })

    return time
}

module.exports = partTwo
