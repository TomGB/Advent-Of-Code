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

const removePaper = (input) => {
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
        return count >= 4;
      }
    })
  );

  return movable;
};

const solve = (input) => {
  const startingPaperCount = input
    .flatMap((row) => row)
    .filter((v) => v).length;
  let paperLocations = input;
  let lastPaperCount = 0;
  let remainingPaperCount = startingPaperCount;
  while (lastPaperCount !== remainingPaperCount) {
    lastPaperCount = remainingPaperCount;
    paperLocations = removePaper(paperLocations);
    remainingPaperCount = paperLocations
      .flatMap((row) => row)
      .filter((v) => v).length;
  }

  return startingPaperCount - remainingPaperCount;
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
