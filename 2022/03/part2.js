const { chunk } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");
const isUpperCase = string => /^[A-Z]*$/.test(string);
const groupInToThree = arrayOfLines => chunk(arrayOfLines, 3);

const converLetterToNumber = letter =>
	isUpperCase(letter)
		? letter.charCodeAt(0) - 64 + 26
		: letter.charCodeAt(0) - 96;

const findThreeDuplicates = (first, second, third) =>
	first
		.split("")
		.find(letter => second.includes(letter) && third.includes(letter));

const run = fileName => {
	let total = 0;

	const backpacks = loadData(fileName);
	const groupsOfBackpacks = groupInToThree(backpacks);

	groupsOfBackpacks.map(groupOfThree => {
		const duplicate = findThreeDuplicates(...groupOfThree);
		total += converLetterToNumber(duplicate);
	});
	console.log(total);
};

run("input");

module.exports = run;
