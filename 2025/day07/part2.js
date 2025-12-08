const { debug } = require("../../lib/debug");

const cache = {};

const caching = (input, location, depth) => {
  const key = `${location},${depth}`;
  if (key in cache) {
    return cache[key];
  }
  const result = solve(input, location, depth);
  cache[key] = result;
  return result;
};

const processRawInput = (input) => {
  const lines = input
    .trim()
    .split("\n")
    .reduce((acc, line, index) => {
      if (index % 2 === 0) acc.push(line.trim().split(""));
      return acc;
    }, []);

  return lines;
};

const solve = (input, location, depth) => {
  if (depth === input.length) {
    return 1;
  }
  if (input[depth][location] !== "^") {
    return caching(input, location, depth + 1);
  } else {
    return (
      caching(input, location - 1, depth + 1) +
      caching(input, location + 1, depth + 1)
    );
  }
};

const run = (input) => {
  const processedInput = processRawInput(input);

  const start = processedInput[0].findIndex((line) => line === "S");
  const result = solve(processedInput, start, 1);
  return result;
};

module.exports = { solve, run };
