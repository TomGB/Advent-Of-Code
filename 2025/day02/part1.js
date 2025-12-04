const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const data = fs.readFileSync("./input.txt", "utf8");

const bothCodes = data.split(",");

const codes = bothCodes.map((code) => code.split("-"));

const isInvalid = (code) => {
  if (code.length % 2 !== 0) return false;

  const halfLength = code.length / 2;
  const firstHalf = code.substring(0, halfLength);
  const secondHalf = code.substring(halfLength);

  if (firstHalf !== secondHalf) return false;

  return true;
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

console.log(codes);

const invalidCodes = codes.flatMap(([start, end]) => {
  const result = checkRange(parseInt(start), parseInt(end));
  return result;
});

console.log(invalidCodes);

const total = invalidCodes.reduce((sum, code) => sum + code, 0);

print(total);
