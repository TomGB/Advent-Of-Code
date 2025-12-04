const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim()
		.split("\n");

	const treesWithIndex = input.map((row, rowIndex) =>
		row.split("").map((tree, treeIndex) => ({
			locY: rowIndex,
			locX: treeIndex,
			height: parseInt(tree),
		}))
	);

	return treesWithIndex;
};

// console.log(loadData("test"));

module.exports = loadData;
