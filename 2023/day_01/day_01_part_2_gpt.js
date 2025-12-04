const fs = require("fs");

// Read the input from the text file
const filename = "test_input_2.txt"; // Replace 'input.txt' with your actual file name
const data = fs.readFileSync(filename, "utf8");

// Function to calculate calibration value for a given line
function calculateCalibrationValue(line) {
  const regex =
    /\b(?:zero|one|two|three|four|five|six|seven|eight|nine|\d+)\b/g;
  const digits = line.match(regex);

  if (digits && digits.length >= 2) {
    const firstDigit = convertToNumber(digits[0]);
    const lastDigit = convertToNumber(digits[digits.length - 1]);
    return firstDigit * 10 + lastDigit;
  }

  return 0;
}

// Function to convert word representation of digits to numbers
function convertToNumber(word) {
  const wordToNumber = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  return wordToNumber[word.toLowerCase()] || parseInt(word, 10) || 0;
}

// Split the input into lines and calculate calibration values
const lines = data.split("\n");
let totalCalibrationValue = 0;

lines.forEach((line) => {
  const calibrationValue = calculateCalibrationValue(line);

  console.log(calibrationValue);
  totalCalibrationValue += calibrationValue;
});

console.log("Total Calibration Value:", totalCalibrationValue);
