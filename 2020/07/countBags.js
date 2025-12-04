module.exports = input => {
    const rules = input.map(rule => {
        const [outerBag, contains] = rule.split(' bags contain ')
        const bags = contains.split(', ')
        const innerBags = bags.map(bag => ({ .../(?<count>\d*) (?<bag>.*) bag/.exec(bag).groups })).filter(({ bag }) => bag !== 'other')
        return { outerBag, innerBags }
    })

    const findParentBags = bagName =>
        rules.filter(rule =>
            rule.innerBags.find(({ bag }) => bag === bagName)
        ).flatMap(({ outerBag }) =>
            [outerBag, ...findParentBags(outerBag)]
        )

    const countBags = (bagName) => {
        const { innerBags } = rules.find(({ outerBag }) => outerBag === bagName)

        return innerBags.reduce(
            (a, { bag, count }) => a + (countBags(bag) * parseInt(count))
            , 1)
    }

    return {
        partOne: new Set(findParentBags('shiny gold')).size,
        partTwo: countBags('shiny gold') - 1
    }
}
