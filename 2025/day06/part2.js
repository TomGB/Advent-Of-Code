const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
  let lines = input.split("\n");
  const operators = lines[lines.length - 1].trim().split(/\s+/);
  lines = lines.slice(0, -1);
  const rotatedText = lines[0]
    .split("")
    .map((_, colIndex) =>
      lines
        .map((row) => row[colIndex])
        .join("")
        .trim()
    )
    .join("\n");
  const rotatedLines = rotatedText
    .split("\n\n")
    .map((line) => line.split("\n").map(Number));
  debug({ rotatedLines, operators });
  return { lines: rotatedLines, operators };
};

const operatorMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const solve = ({ lines, operators }) => {
  return operators.reduce((grandTotal, op, rowId) => {
    let total = lines[rowId][0];

    for (let colId = 1; colId < lines[rowId].length; colId++) {
      total = operatorMap[op](total, lines[rowId][colId]);
    }

    return grandTotal + total;
  }, 0);
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
