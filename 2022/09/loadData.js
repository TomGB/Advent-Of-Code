const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim()
		.split("\n");

	const treesWithIndex = input.map(line => {
		const [direction, distance] = line.split(" ");

		return {
			direction,
			distance: parseInt(distance),
		};
	});

	return treesWithIndex;
};

module.exports = loadData;
