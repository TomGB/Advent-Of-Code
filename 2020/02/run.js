const fs = require('fs')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').filter(x => x)

const passwords = input.map(line => {
    const [policy, password] = line.split(': ')
    const [count, letter] = policy.split(' ')
    const instructions = count.split('-').map(x => parseInt(x))

    return { password, letter, instructions }
})

const partOne = passwords.filter(({ password, letter, instructions }) => {
    const numLetters = password.split('').filter(x => x === letter).length
    return numLetters >= instructions[0] && numLetters <= instructions[1]
}).length

const partTwo = passwords.filter(({ password, letter, instructions }) => {
    const passwordArr = password.split('')
    return (passwordArr[instructions[0] - 1] === letter) !== (passwordArr[instructions[1] - 1] === letter)
}).length

console.log({ partOne, partTwo })
