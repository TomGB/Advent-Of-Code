const { chunk } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");
const isUpperCase = string => /^[A-Z]*$/.test(string);

const findDuplicateLetter = (first, second) =>
	first.split("").find(letter => second.includes(letter));

const converLetterToNumber = letter =>
	isUpperCase(letter)
		? letter.charCodeAt(0) - 64 + 26
		: letter.charCodeAt(0) - 96;

const splitLineInHalf = inputLine => {
	const firstHalf = inputLine.slice(0, inputLine.length / 2);
	const secondHalf = inputLine.slice(inputLine.length / 2);
	return { firstHalf, secondHalf };
};

const run = fileName => {
	let total = 0;

	const backpacks = loadData(fileName);
	const backpackHalves = backpacks.map(splitLineInHalf);

	backpackHalves.map(({ firstHalf, secondHalf }) => {
		const duplicate = findDuplicateLetter(firstHalf, secondHalf);
		total += converLetterToNumber(duplicate);
	});

	console.log(total);
	return total;
};

run("input");

// console.log(findDuplicateLetter("asdf", "dgfh"));

module.exports = run;
