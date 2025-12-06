const part2 = require("./part2");

const testCases = [
  [38976, 976],
  [76091, 791],
  [68392, 892],
  [2342342342342, 42342342342],
  [2342342342342, 4342342342],
];

describe("findTheLargest", () => {
  test.each(testCases)(
    "converts %i to largest number: %i",
    (input, expectedOutput) => {
      const inputStr = String(input);
      const expectedStr = String(expectedOutput);
      const numberToFind = expectedStr.length;
      const inputArray = inputStr.split("").map((d) => parseInt(d, 10));

      const result = part2(inputArray, numberToFind);
      expect(result).toBe(expectedStr);
    }
  );
});
