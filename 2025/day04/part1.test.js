const { solve } = require("./part1");

const testCases = [
  [
    `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
    `..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.`,
    13,
  ],
];

describe("Part 1", () => {
  testCases.forEach(([input, expectedOutput, expectedCount], idx) => {
    test(`case ${idx + 1}`, () => {
      const result = solve(input);
      expect(result.visual).toBe(expectedOutput);
      expect(result.count).toBe(expectedCount);
    });
  });
});
