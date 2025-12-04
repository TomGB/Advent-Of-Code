const { times, uniqWith, clone, isEqual } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const move = {
	U: item => (item.y += 1),
	D: item => (item.y -= 1),
	L: item => (item.x -= 1),
	R: item => (item.x += 1),
};

const run = (fileName, markerLength) => {
	const instructions = loadData(fileName);
	const headPosition = {
		x: 0,
		y: 0,
	};

	const tailPosition = {
		x: 0,
		y: 0,
	};

	const tailPositions = new Set();

	instructions.map(({ direction, distance }) => {
		times(distance, () => {
			move[direction](headPosition);

			if (Math.abs(headPosition.x - tailPosition.x) > 1) {
				const yOffset = headPosition.y - tailPosition.y;

				if (yOffset > 0) {
					move["U"](tailPosition);
				} else if (yOffset < 0) {
					move["D"](tailPosition);
				}

				if (headPosition.x > tailPosition.x) {
					move["R"](tailPosition);
				} else {
					move["L"](tailPosition);
				}
			}

			if (Math.abs(headPosition.y - tailPosition.y) > 1) {
				const xOffset = headPosition.x - tailPosition.x;

				if (xOffset > 0) {
					move["R"](tailPosition);
				} else if (xOffset < 0) {
					move["L"](tailPosition);
				}

				if (headPosition.y > tailPosition.y) {
					move["U"](tailPosition);
				} else {
					move["D"](tailPosition);
				}
			}

			tailPositions.add(`${tailPosition.x} ${tailPosition.y}`);
		});
	});

	console.log(tailPositions.size);
};

run("input");

// 13

module.exports = run;
