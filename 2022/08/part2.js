const { flatten } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const run = (fileName, markerLength) => {
	const trees = loadData(fileName);

	const rotatedTrees = trees[0].map((_, colIndex) =>
		trees.map(row => row[colIndex])
	);

	const checkIfSeen = (row, startingMax) => {
		let maxForRow = startingMax - 1;
		let maxDistance = row.length;
		row.find((tree, index) => {
			if (tree.height > maxForRow) {
				maxDistance = index + 1;
				return true;
			}
		});

		return maxDistance;
	};

	trees.map((row, rowIndex) => {
		row.map((tree, treeIndex) => {
			// if (rowIndex !== 2 || treeIndex !== 3) return;

			const up = [
				...rotatedTrees[tree.locX].slice(0, tree.locY),
			].reverse();
			const down = rotatedTrees[tree.locX].slice(
				tree.locY + 1,
				row.length
			);
			const left = [...row.slice(0, treeIndex)].reverse();
			const right = row.slice(treeIndex + 1, row.length);

			// console.log({
			// 	up,
			// 	down,
			// 	left,
			// 	right,
			// });

			let numSeenUp = checkIfSeen(up, tree.height);
			let numSeenDown = checkIfSeen(down, tree.height);
			let numSeenLeft = checkIfSeen(left, tree.height);
			let numSeenRight = checkIfSeen(right, tree.height);

			// console.log({
			// 	numTreesSeenUp,
			// 	numSeenDown,
			// 	numSeenLeft,
			// 	numSeenRight,
			// });

			const multiplyTreesSeen =
				numSeenUp * numSeenDown * numSeenLeft * numSeenRight;

			tree.scenicScore = multiplyTreesSeen;
		});
	});

	console.log(
		trees.map((row, rowIndex) => {
			return row.map((tree, treeIndex) => {
				return tree.scenicScore;
			});
		})
	);

	console.log(
		[
			...flatten(trees)
				.sort((a, b) => a.scenicScore - b.scenicScore)
				.map(({ scenicScore }) => scenicScore),
		].reverse()[0]
	);
};

run("input");

// 625 too low
// 960 too low

module.exports = run;
