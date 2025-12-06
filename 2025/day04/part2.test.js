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
    43,
  ],
];

describe("Part 1", () => {
  testCases.forEach(([input, expectedCount], idx) => {
    test(`case ${idx + 1}`, () => {
      const result = solve(input);
      expect(result).toBe(expectedCount);
    });
  });
});
