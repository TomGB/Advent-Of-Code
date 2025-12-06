const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
  let lines = input.split("\n").map((line) => line.trim().split(/\s+/));
  const operators = lines[lines.length - 1];
  lines = lines.slice(0, -1);
  lines = lines.map((line) => line.map(Number));
  debug({ lines, operators });
  return { lines, operators };
};

const operatorMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const solve = ({ lines, operators }) => {
  return operators.reduce((grandTotal, op, colId) => {
    let total = lines[0][colId];

    for (let lineId = 1; lineId < lines.length; lineId++) {
      total = operatorMap[op](total, lines[lineId][colId]);
    }

    debug({ op, total });
    return grandTotal + total;
  }, 0);
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
