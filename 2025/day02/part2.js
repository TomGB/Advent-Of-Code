const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const data = fs.readFileSync("./input.txt", "utf8");

const bothCodes = data.split(",");

let codes = bothCodes.map((code) => code.split("-"));

const getDivisors = (num) => {
  const divisors = [];

  for (let i = 1; i < num; i++) {
    if ((num / i) % 1 === 0) {
      divisors.push(i);
    }
  }

  return divisors;
};

const isInvalid = (code) => {
  if (code.length == 1) return false;

  const divisors = getDivisors(code.length);

  const resultsForDivisors = divisors.map((divisor) => {
    const regex = new RegExp(`.{${divisor}}`, "g");
    const sections = code.match(regex);
    const allEqual = sections.every((section) => section === sections[0]);
    if (allEqual) {
      return true;
    }
  });

  return resultsForDivisors.includes(true);
};

const checkRange = (start, end) => {
  const invalidCodes = [];

  for (let code = start; code <= end; code++) {
    if (isInvalid(code.toString())) {
      invalidCodes.push(code);
    }
  }

  return invalidCodes;
};

const invalidCodes = codes.flatMap(([start, end]) => {
  const result = checkRange(parseInt(start), parseInt(end));

  console.log(`Range ${start}-${end}: found ${result} invalid codes.`);
  return result;
});

const total = invalidCodes.reduce((sum, code) => sum + code, 0);

console.log(total);
