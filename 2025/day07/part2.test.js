const { solve } = require("./part2");

const testCases = [
  // TODO: Add test cases
  // [input, expectedOutput]
];

describe("Part 2", () => {
  testCases.forEach(([input, expectedOutput], idx) => {
    test(`case ${idx + 1}`, () => {
      const result = solve(input);
      expect(result).toBe(expectedOutput);
    });
  });
});
