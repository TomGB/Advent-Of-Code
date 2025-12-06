const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
  const lines = input.split("\n");
  return lines.map((line) => line.split("").map((item) => item === "@"));
};

const safeGet = (array, row, col) => {
  if (row < 0 || row >= array.length) return 0;
  if (col < 0 || col >= array[0].length) return 0;
  return array[row][col] || 0;
};

const solve = (input) => {
  const movable = input.map((row, i) =>
    row.map((cell, j) => {
      if (cell) {
        const count =
          safeGet(input, i - 1, j - 1) +
          safeGet(input, i, j - 1) +
          safeGet(input, i + 1, j - 1) +
          safeGet(input, i - 1, j) +
          0 +
          safeGet(input, i + 1, j) +
          safeGet(input, i - 1, j + 1) +
          safeGet(input, i, j + 1) +
          safeGet(input, i + 1, j + 1);
        return count < 4;
      }
    })
  );

  const totalMovable = movable.flatMap((row) => row).filter((v) => v).length;

  console.log(totalMovable);

  return totalMovable;
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
