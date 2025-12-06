const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
  const [ranges, items] = input.split("\n\n");

  return {
    ranges: ranges.split("\n").map((range) => range.split("-").map(Number)),
    items: items.split("\n").map(Number),
  };
};

const solve = ({ ranges, items }) => {
  const count = items.filter((item) =>
    ranges.some(([min, max]) => item >= min && item <= max)
  ).length;
  return count;
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
