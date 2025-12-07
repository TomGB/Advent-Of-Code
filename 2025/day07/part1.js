const { debug } = require("../../lib/debug");

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

const solve = (input) => {
  let splitCount = 0;
  for (let i = 0; i < input.length - 1; i++) {
    const topLine = input[i];
    const bottomLine = input[i + 1];

    for (let j = 0; j < topLine.length; j++) {
      if (topLine[j] === "S" && bottomLine[j] === "^") {
        splitCount++;
        bottomLine[j - 1] = "S";
        bottomLine[j + 1] = "S";
      } else if (topLine[j] === "S") {
        bottomLine[j] = "S";
      }
    }
  }

  debug(input.map((line) => line.join("")).join("\n"));
  return splitCount;
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
