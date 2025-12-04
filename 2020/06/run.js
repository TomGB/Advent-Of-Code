const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
const groups = input.split('\n\n')

const answerCount = groups.map(group => {
    const letters = group.replace(/\n/g, '').split('')
    return (new Set(letters)).size
})

const matchingAnswersCount = groups.map(group => {
    const people = group.split('\n')
    let options = [...people[0]]
    people.map(person => {
        options = options.filter(l => person.includes(l));
    })

    return (new Set(options)).size
})

console.log({
    partOne: answerCount.reduce((a, v) => a + v),
    partTwo: matchingAnswersCount.reduce((a, v) => a + v),
})