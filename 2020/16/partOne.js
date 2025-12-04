const partOne = input => {
    let [rules, ticketsText] = input.split('\n\nyour ticket:\n')
    let [myTicket, tickets] = ticketsText.split('\n\nnearby tickets:\n')

    rules = rules.split('\n').map(rule => {
        const [, ruleNums] = rule.split(': ')
        let group = ruleNums.split(' or ')
        return group.map(x => x.split('-'))
    })
    myTicket = myTicket.split(',')
    tickets = tickets.trim().split('\n').map(x => x.split(',').map(v => parseInt(v)))

    const validatedTickets = tickets.map((ticket) => {
        return ticket.map(value => {
            const rulesMatched = rules.map((range, ruleIndex) => {
                const isInsideRange = range.find(([low, high]) => value <= high && value >= low)
                return isInsideRange ? ruleIndex : false
            }).filter(Number.isInteger)

            return { value, rulesMatched }
        })
    })

    const invalidTicketValues = validatedTickets.flatMap(ticket =>
        ticket.filter(({ rulesMatched }) => !rulesMatched.length)
    ).map(({ value }) => value)

    return invalidTicketValues.reduce((a, value) => a + value)
}

module.exports = partOne
