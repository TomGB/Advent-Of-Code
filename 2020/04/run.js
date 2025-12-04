const fs = require('fs')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const passportEntries = input.split(`\n\n`).map(passport => {
    const entries = passport.split(/[\n\s]+/)
    return entries.map(entry => entry.split(':'))
})

const heights = {
    cm: h => h >= 150 && h <= 193,
    in: h => h >= 59 && h <= 76,
}

const requiredFields = Object.entries({
    byr: v => v >= 1920 && v <= 2002,
    iyr: v => v >= 2010 && v <= 2020,
    eyr: v => v >= 2020 && v <= 2030,
    hgt: v => {
        const unit = v.slice(-2)
        const heightCheck = heights[unit]
        return (heightCheck && heightCheck(v.slice(0, -2)))
    },
    hcl: v => /^#[0-9a-f]{6}$/i.test(v),
    ecl: v => 'amb blu brn gry grn hzl oth'.split(' ').includes(v),
    pid: v => /^\d{9}$/i.test(v),
})

const partOne = passportEntries.filter(
    passport => requiredFields.every(
        ([key]) => passport.find(([entryKey]) => key === entryKey)
    )
).length

const partTwo = passportEntries.filter(
    passport => requiredFields.every(
        ([key, check]) => passport.find(([entryKey, value]) => key === entryKey && check(value))
    )
).length

console.log({ partOne, partTwo })
