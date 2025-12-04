const { times, uniqWith, clone, isEqual } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const move = {
	U: item => (item.y += 1),
	D: item => (item.y -= 1),
	L: item => (item.x -= 1),
	R: item => (item.x += 1),
};

const showRopeOnAGrid = (rope, tailPositions) => {
	// const allXPositions = rope.map(({ x }) => x).sort();
	// const allYPositions = rope.map(({ y }) => y).sort();

	// const xMin = allXPositions[0];
	// const xMax = allXPositions[allXPositions.length - 1];

	// const yMin = allYPositions[0];
	// const yMax = allYPositions[allYPositions.length - 1];

	const grid = times(40, () => times(40, () => "."));

	rope.map(({ x, y }, i) => {
		// console.log({ x, y });
		grid[-y + 20][x + 20] = `${i}`;
	});

	[...tailPositions].map(pos => {
		const [x, y] = pos.split(" ");

		// console.log({ x, y });

		grid[-parseInt(y) + 20][parseInt(x) + 20] = "#";
	});

	console.log(grid.map(row => row.join("")));
};

const run = (fileName, markerLength) => {
	const instructions = loadData(fileName);

	const rope = times(10, () => ({
		x: 0,
		y: 0,
	}));

	const tailPositions = new Set();

	instructions.map(({ direction, distance }) => {
		// console.log(rope);

		times(distance, () => {
			move[direction](rope[0]);

			for (let index = 0; index < rope.length - 1; index++) {
				const headPosition = rope[index];
				const tailPosition = rope[index + 1];

				if (index === rope.length - 2) {
					tailPositions.add(`${tailPosition.x} ${tailPosition.y}`);
				}

				if (Math.abs(headPosition.x - tailPosition.x) > 1) {
					const yOffset = headPosition.y - tailPosition.y;

					// console.log({ yOffset });

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

					if (index === rope.length - 2) {
						tailPositions.add(
							`${tailPosition.x} ${tailPosition.y}`
						);
					}
				} else if (Math.abs(headPosition.y - tailPosition.y) > 1) {
					const xOffset = headPosition.x - tailPosition.x;

					// console.log({ xOffset });

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

					if (index === rope.length - 2) {
						tailPositions.add(
							`${tailPosition.x} ${tailPosition.y}`
						);
					}
				}

				// showRopeOnAGrid(rope, tailPositions);
			}
		});
	});

	console.log(tailPositions.size);
};

run("input");

// 2244 too low

module.exports = run;
