const { initFromArgs } = require("../../lib/debug");
const { timedRun } = require("../../lib/timer");
const { readInputFile } = require("../../lib/input");
const { run: part1 } = require("./part1");
const { run: part2 } = require("./part2");

initFromArgs();

const testInput = readInputFile("testinput.txt");
const input = readInputFile("input.txt");

console.table(
  {
    "Part 1 Test": timedRun(() => part1(testInput, 10)),
    // "Part 1": timedRun(() => part1(input, 1000)),
    // "Part 2 Test": timedRun(() => part2(testInput, 10)),
    // "Part 2": timedRun(() => part2(input, 1000)),
  },
  ["Answer", "s", "ms", "μs"]
);
