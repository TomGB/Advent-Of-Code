const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
	const lines = input.trim().split("\n");
	return lines;
};

const solve = (input) => {
	debug("Input:", input);
	return 0;
};

const run = (input) => {	
	const processedInput = processRawInput(input);
	const result = solve(processedInput);
	return result;
};

module.exports = { solve, run };
