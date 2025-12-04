const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");

const instructions = lines.map((line) => [
  line[0],
  parseInt(line.substring(1)),
]);

console.log(instructions);

let position = 50;

let score = 0;

instructions.forEach(([direction, amount]) => {
  if (direction === "L") {
    position -= amount;
    position %= 100;
    position = position < 0 ? 100 + position : position;
  } else if (direction === "R") {
    position += amount;
    position %= 100;
    position = position >= 100 ? position - 100 : position;
  }

  if (position === 0) score += 1;

  print(position);
});

print(score);
