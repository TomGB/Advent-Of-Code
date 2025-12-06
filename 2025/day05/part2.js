const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
  const [ranges, items] = input.split("\n\n");

  return {
    ranges: ranges.split("\n").map((range) => range.split("-").map(Number)),
    items: items.split("\n").map(Number),
  };
};

const insertInOrder = (number, action, rangesInOrder) => {
  const higherIndex = rangesInOrder.findIndex((item) => item.number > number);
  if (higherIndex === -1) {
    rangesInOrder.push({ number, action });
    return rangesInOrder;
  } else {
    rangesInOrder.splice(higherIndex, 0, { number, action });
    return rangesInOrder;
  }
};

const solve = ({ ranges, items }) => {
  let rangesInOrder = [];
  ranges.map(([min, max]) => {
    rangesInOrder = insertInOrder(min, "start", rangesInOrder);
    rangesInOrder = insertInOrder(max + 1, "end", rangesInOrder);
  });

  let depth = 0;

  const topLevelRanges = rangesInOrder.filter(({ action }, i) => {
    if (action === "start") {
      depth++;
    }
    const result = depth < 2;
    if (action === "end") {
      depth--;
    }

    return result;
  });

  const total = topLevelRanges.reduce((acc, { number, action }, i) => {
    if (action === "start") {
      return acc - number;
    } else {
      return acc + number;
    }
  }, 0);

  return total;
};

const run = (input) => {
  const processedInput = processRawInput(input);
  const result = solve(processedInput);
  return result;
};

module.exports = { solve, run };
