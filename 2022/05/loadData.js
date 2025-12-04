const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const loadData = fileName => {
	const input = fs.readFileSync(`${__dirname}/${fileName}.txt`, "utf8");

	const [stacksText, instructionsText] = input.split("\n\n");

	const instructionsLines = instructionsText.trim().split("\n");

	const instructions = instructionsLines.map(instructionLine => {
		const [_, quantity, from, to] = instructionLine.match(
			/move (\d+) from (\d+) to (\d+)/
		);

		return mapValues(
			{
				quantity,
				from,
				to,
			},
			parseInt
		);
	});

	const stackLines = stacksText.split("\n");
	stackLines.pop();

	const stackItems = stackLines.map(row =>
		chunk(row, 4).map(letters => letters.join("").trim())
	);

	const stacksWithBlanks = stackItems[0].map((val, index) =>
		stackItems.map(row => row[index]).reverse()
	);

	const stacks = stacksWithBlanks.map(stack => stack.filter(x => x));

	return {
		stacks,
		instructions,
	};
};

loadData("input");

module.exports = loadData;
