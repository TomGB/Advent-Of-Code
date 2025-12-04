const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const isUpperCase = string => /^[A-Z]*$/.test(string);

const converLetterToNumber = letter =>
	isUpperCase(letter)
		? letter.charCodeAt(0) - 64 + 26
		: letter.charCodeAt(0) - 96;

const loadData = fileName => {
	const inputPairs = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim()
		.split("\n\n")
		.map(pair => {
			const pairStrings = pair.split("\n");
			return pairStrings.map(pairString => JSON.parse(pairString));
		});

	return inputPairs;
};

// print(loadData("test"));

module.exports = loadData;
