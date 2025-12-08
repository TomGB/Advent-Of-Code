const { solve } = require("./part1");

const testCases = [
  // TODO: Add test cases
  // [input, expectedOutput]
];

describe("Part 1", () => {
  testCases.forEach(([input, expectedOutput], idx) => {
    test(`case ${idx + 1}`, () => {
      const result = solve(input);
      expect(result).toBe(expectedOutput);
    });
  });
});
