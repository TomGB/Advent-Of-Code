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

const rotateLeft = () => {
  position -= 1;
  if (position < 0) {
    position = 99;
  }
};

const rotateRight = () => {
  position += 1;
  if (position >= 100) {
    position = 0;
  }
};

instructions.forEach(([direction, amount]) => {
  for (let i = 0; i < amount; i++) {
    if (direction === "L") {
      rotateLeft();
    } else if (direction === "R") {
      rotateRight();
    }
    if (position === 0) score += 1;
  }
});

print(score);
