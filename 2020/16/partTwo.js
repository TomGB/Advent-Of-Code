const partTwo = input => {
    let [rules, ticketsText] = input.split('\n\nyour ticket:\n')
    let [myTicket, tickets] = ticketsText.split('\n\nnearby tickets:\n')

    rules = rules.split('\n').map((rule) => {
        const [name, ruleNums] = rule.split(': ')
        let group = ruleNums.split(' or ')
        return { name, range: group.map(x => x.split('-')) }
    })
    myTicket = myTicket.split(',')
    tickets = tickets.trim().split('\n').map(x => x.split(',').map(v => parseInt(v)))

    const validatedTickets = tickets.flatMap((ticket) => {
        return ticket.map((value, valueIndex) => {
            const rulesMatched = rules.filter(({ range }) => {
                const isInsideRange = range.find(([low, high]) => value <= high && value >= low)
                return isInsideRange
            }).map(({ name }) => name)

            return { rulesMatched, valueIndex }
        }).filter(({ rulesMatched }) => rulesMatched.length)
    })

    let possibleFields = Array.from({ length: rules.length }, () => rules.map(({ name }) => name))

    validatedTickets.map(({ rulesMatched, valueIndex }) => {
        possibleFields[valueIndex] = possibleFields[valueIndex].filter(name => rulesMatched.includes(name))
    })

    const knownFields = {}

    do {
        const foundIndex = possibleFields.findIndex(options => options.length === 1)
        const found = possibleFields[foundIndex][0]
        knownFields[foundIndex] = found

        possibleFields = possibleFields.map(options => options.filter(rule => rule !== found))
    } while (Object.keys(knownFields).length < myTicket.length)

    const departureFieldIndexes = Object.entries(knownFields).filter(([, name]) => name.includes('departure')).map(([index]) => index)

    const departureValues = departureFieldIndexes.map(dIndex => myTicket[dIndex])

    console.log({ knownFields, departureFieldIndexes, departureValues })

    return departureValues.reduce((a, x) => a * x)

}

module.exports = partTwo
