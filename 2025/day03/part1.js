const processRawInput = (input) => {
  const banks = input.split("\n");

  return banks.map((bank) => bank.split("").map((jolt) => parseInt(jolt)));
};

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

const largestTotals = (inputArray) => {
  const [largest, pos] = findLargest(inputArray);

  if (pos === inputArray.length - 1) {
    const [firstLargest] = findLargest(inputArray.slice(0, pos));
    return parseInt(`${firstLargest}${largest}`);
  }

  const remainingNumbers = inputArray.slice(pos + 1);

  const [secondLargest] = findLargest(remainingNumbers);

  return parseInt(`${largest}${secondLargest}`);
};

const run = (input) => {
  const processedInput = processRawInput(input);

  const answers = processedInput.map((inputArray) => {
    const res = largestTotals(inputArray);
    return res;
  });

  return answers.reduce((sum, numString) => sum + parseInt(numString), 0);
};

module.exports = { largestTotals, run };
