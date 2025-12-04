const { times, uniqWith, clone, isEqual } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const loopThroughGrid = (grid, fn) =>
	grid.map((row, y) => row.map((item, x) => fn(item, x, y)));

const printGrid = (grid, startX, startY, endX, endY) => {
	const gridAsText = loopThroughGrid(grid, (item, x, y) => {
		if (x === startX && y === startY) {
			return "S";
		} else if (x === endX && y === endY) {
			return "E";
		} else {
			return item.visited ? "X" : " ";
		}
	}).map(item => item.join(""));

	console.log(gridAsText);
};

const printCurrentStpes = (grid, currentSteps) => {
	const gridAsText = loopThroughGrid(grid, (item, x, y) => {
		const isCurrentStep = currentSteps.find(
			step => x === step.x && y == step.y
		);

		return isCurrentStep ? item.heightLetter : " ";
	}).map(item => item.join(""));

	console.log(gridAsText);
};

const getGridLocation = (grid, x, y) => {
	try {
		return grid[y][x];
	} catch (error) {
		return false;
	}
};

const findPossibleSteps = (grid, currentSteps) => {
	const newSteps = [];

	const endReached = currentSteps.some(step => {
		const up = getGridLocation(grid, step.x, step.y - 1);
		const down = getGridLocation(grid, step.x, step.y + 1);
		const left = getGridLocation(grid, step.x - 1, step.y);
		const right = getGridLocation(grid, step.x + 1, step.y);

		return [up, down, left, right]
			.filter(Boolean)
			.filter(({ visited }) => !visited)
			.filter(
				({ height, isEnd }) =>
					height <= step.height + 1 ||
					(["y", "z"].includes(step.heightLetter) && isEnd)
			)
			.some(possibleStep => {
				possibleStep.visited = true;
				newSteps.push(possibleStep);

				if (possibleStep.isEnd) {
					return true;
				}
			});
	});

	// printCurrentStpes(grid, newSteps);

	if (endReached) return "finished";

	return newSteps;
};

const run = (fileName, markerLength) => {
	const { grid, startX, startY } = loadData(fileName);

	let currentSteps = [{ x: startX, y: startY, height: 0 }];

	let numSteps = 0;

	do {
		currentSteps = findPossibleSteps(grid, currentSteps);

		numSteps++;
	} while (currentSteps != "finished");

	console.log(numSteps);

	return numSteps;
};

run("test");

module.exports = run;
