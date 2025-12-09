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
    // "Part 1 Test": timedRun(() => part1(testInput)),
    // "Part 1": timedRun(() => part1(input)),
    "Part 2 Test": timedRun(() => part2(testInput)),
    "Part 2": timedRun(() => part2(input)),
  },
  ["Answer", "s", "ms", "μs"]
);
