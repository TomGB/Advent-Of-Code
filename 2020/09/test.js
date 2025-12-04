const fs = require('fs')
const findBadNumber = require('./findBadNumber')

const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split('\n').filter(x => x).map(x => parseInt(x))

const preambleLength = 5

findBadNumber({ input, preambleLength })
