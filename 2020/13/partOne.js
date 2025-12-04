const partOne = input => {
    const [time, buses] = input
    const busTimes = buses.split(',').filter((x) => x !== 'x').map(x => parseInt(x))

    const myTime = parseInt(time)

    const waitingTimes = busTimes.map(busInt => {
        let busTime = busInt
        do {
            busTime += busInt
        } while (busTime < myTime)

        return { busInt, waitTime: busTime - myTime }
    })

    const [bestBus] = waitingTimes.sort(({ waitTime: a }, { waitTime: b }) => a - b)

    return bestBus.busInt * bestBus.waitTime
}

module.exports = partOne
