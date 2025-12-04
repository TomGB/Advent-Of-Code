const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const data = fs.readFileSync("./input.txt", "utf8");

const lines = data.split("\n");

const characters = lines.map((line) => line.split(""));

const numbers = characters.map((line) =>
  line.filter((character) => parseInt(character))
);

print(numbers);

const together = numbers.map((line) => line[0] + line[line.length - 1]);

print(together);

const asNumbers = together
  .map((numberAsString) => parseInt(numberAsString))
  .filter((x) => x);

print(asNumbers);

const result = asNumbers.reduce((a, n) => a + n, 0);

print(result);
