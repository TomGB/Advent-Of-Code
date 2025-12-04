const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const replaceWordWithNumber = (text) => {
  const numbersAsStrings = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const indexesOfNumbers = numbersAsStrings.map((number) => {
    const indexOfNumber = text.indexOf(number);

    if (indexOfNumber === -1) return 99999;

    return indexOfNumber;
  });

  const indexOfNumberOfFirstOccurange = indexesOfNumbers.indexOf(
    Math.min(...indexesOfNumbers)
  );

  if (indexOfNumberOfFirstOccurange > numbersAsStrings.length) {
    return text;
  }

  const numberToReplace = numbersAsStrings[indexOfNumberOfFirstOccurange];

  text = text.replace(numberToReplace, indexOfNumberOfFirstOccurange);

  return text;
};

const data = fs.readFileSync("./input_2.txt", "utf8");

const lines = data.split("\n");

const characters = lines.map((line) => {
  let oldLine = line;
  let newLine = oldLine;
  do {
    oldLine = newLine;

    newLine = replaceWordWithNumber(oldLine);
  } while (newLine != oldLine);

  return newLine.split("");
});

print(characters);

const numbers = characters.map((line) =>
  line.filter((character) => parseInt(character))
);

// print(numbers);

const together = numbers.map((line) => line[0] + line[line.length - 1]);

// print(together);

const asNumbers = together
  .map((numberAsString) => parseInt(numberAsString))
  .filter((x) => x);

const result = asNumbers.reduce((a, n) => a + n, 0);

print(result);
