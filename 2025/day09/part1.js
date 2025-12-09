const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
	const lines = input.trim().split("\n").map((line) => line.split(",").map(Number));
	return lines;
};

const calculateArea = (a, b) => (Math.abs(b[0] - a[0]) + 1) * (Math.abs(b[1] - a[1]) + 1);

const solve = (input) => {
	const areas = input.flatMap((a, i) =>
		input.slice(i + 1).map(b => ({ a, b, area: calculateArea(a, b) }))
	);

	debug(areas.sort((a, b) => b.area - a.area));

	return areas[0].area;
};

const run = (input) => {
	const processedInput = processRawInput(input);
	const result = solve(processedInput);
	return result;
};

module.exports = { solve, run };
