const { debug } = require("../../lib/debug");

const findLargest = (arr) => {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  debug("Finding largest in array:", arr);
  let largest = arr[0];
  let position = 0;

  arr.forEach((num, index) => {
    if (num >= largest) {
      largest = num;
      position = index;
    }
  });

  return [largest, position];
};

const findAllThatMatch = (arr, target) => {
  const matches = [];

  debug("Finding all that match:", target, "in array:", arr);

  arr.forEach((num, index) => {
    if (num === target) {
      matches.push([num, index]);
    }
  });

  return matches;
};

const findTheLargest = (inputArray, numberToFind) => {
  debug(inputArray.length);
  if (numberToFind <= 0) {
    throw new Error("numberToFind must be greater than 0");
  }
  const [largest, pos] = findLargest(inputArray);

  const largestList = findAllThatMatch(inputArray, largest);

  // If there are enough of the largest number to satisfy the request

  if (largestList.length >= numberToFind) {
    return largest.toString().repeat(numberToFind);
  }

  // If largest numbers and remaining numbers can satisfy the request

  debug({
    largestListLength: largestList.length,
    inputArrayLength: inputArray.length,
    pos,
    numberToFind,
  });

  const numbersToRight = inputArray.length - (pos + 1);

  const numbersFound = largestList.length + numbersToRight;

  debug({ numbersToRight, numbersFound });

  if (numbersFound == numberToFind) {
    debug("numbersFound == numberToFind");
    return (
      largest.toString().repeat(largestList.length) +
      inputArray.slice(pos + 1).join("")
    );
  } else if (numbersFound > numberToFind) {
    debug("numbersFound > numberToFind");
    const neededFromRemaining = numberToFind - largestList.length;
    const remainingNumbers = inputArray.slice(pos + 1);
    debug({ neededFromRemaining, remainingNumbers });
    return (
      largest.toString().repeat(largestList.length) +
      findTheLargest(remainingNumbers, neededFromRemaining)
    );
  } else if (numbersFound < numberToFind) {
    debug("numbersFound < numberToFind");
    const neededFromRemaining = numberToFind - (inputArray.length - pos);
    debug({
      numbersFound,
      numberToFind,
      inputArray,
      pos,
      neededFromRemaining,
    });
    const remainingNumbers = inputArray.slice(0, pos);
    return (
      findTheLargest(remainingNumbers, neededFromRemaining) +
      inputArray.slice(pos).join("")
    );
  }
};

const processRawInput = (input) => {
  const banks = input.split("\n");

  return banks.map((bank) => bank.split("").map((jolt) => parseInt(jolt)));
};

const run = (input) => {
  const processedInput = processRawInput(input);

  const answers = processedInput.map((inputArray) => {
    const res = findTheLargest(inputArray, 12);
    return res;
  });

  return answers.reduce((sum, numString) => sum + parseInt(numString), 0);
};

module.exports = { findTheLargest, run };
