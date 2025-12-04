const { flatten } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const run = (fileName, markerLength) => {
	const trees = loadData(fileName);

	trees.map((row, rowIndex) => {
		let maxForRow = -1;
		row.map((tree, treeIndex) => {
			if (tree.height > maxForRow) {
				maxForRow = tree.height;
				tree.seen = true;
			}
		});

		maxForRow = -1;
		row.reverse().map((tree, treeIndex) => {
			if (tree.height > maxForRow) {
				maxForRow = tree.height;
				tree.seen = true;
			}
		});
	});

	const rotatedTrees = trees[0].map((_, colIndex) =>
		trees.map(row => row[colIndex])
	);

	console.log(rotatedTrees);

	rotatedTrees.map((row, rowIndex) => {
		let maxForRow = -1;
		row.map((tree, treeIndex) => {
			if (tree.height > maxForRow) {
				maxForRow = tree.height;
				tree.seen = true;
			}
		});

		maxForRow = -1;
		row.reverse().map((tree, treeIndex) => {
			if (tree.height > maxForRow) {
				maxForRow = tree.height;
				tree.seen = true;
			}
		});
	});

	console.log(rotatedTrees);

	console.log(flatten(rotatedTrees).filter(({ seen }) => seen).length);
};

run("input");

// 2448 too high

module.exports = run;
