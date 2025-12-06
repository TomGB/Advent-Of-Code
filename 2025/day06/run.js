const fs = require("node:fs");
const path = require("node:path");
const { initFromArgs } = require("../../lib/debug");
const { timedRun } = require("../../lib/timer");
const { run: part1 } = require("./part1");
const { run: part2 } = require("./part2");

initFromArgs();

const testInput = fs.readFileSync(
  path.join(__dirname, "inputs", "testinput.txt"),
  "utf8"
);
const input = fs.readFileSync(
  path.join(__dirname, "inputs", "input.txt"),
  "utf8"
);

console.table(
  {
    "Part 1 Test": timedRun(part1, testInput),
    "Part 1": timedRun(part1, input),
    "Part 2 Test": timedRun(part2, testInput),
    "Part 2": timedRun(part2, input),
  },
  ["Answer", "s", "ms", "μs"]
);
