const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const data = fs.readFileSync("./input.txt", "utf8");

const banks = data.split("\n");

const batteries = banks.map((bank) =>
  bank.split("").map((jolt) => parseInt(jolt))
);

const findLargest = (arr) => {
  let largest = arr[0];
  let position = 0;

  arr.forEach((num, index) => {
    if (num > largest) {
      largest = num;
      position = index;
    }
  });

  return [largest, position];
};

print(batteries);

const largestTotals = batteries.map((inputArray) => {
  const [largest, pos] = findLargest(inputArray);

  if (pos === inputArray.length - 1) {
    const [firstLargest] = findLargest(inputArray.slice(0, pos));
    return parseInt(`${firstLargest}${largest}`);
  }

  const remainingNumbers = inputArray.slice(pos + 1);

  const [secondLargest] = findLargest(remainingNumbers);

  return parseInt(`${largest}${secondLargest}`);
});

print(largestTotals.reduce((sum, num) => sum + num, 0));
// 357
