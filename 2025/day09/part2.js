const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
	const lines = input.trim().split("\n").map((line) => line.split(",").map(Number));
	return lines;
};

const calculateArea = (a, b) => (Math.abs(b[0] - a[0]) + 1) * (Math.abs(b[1] - a[1]) + 1);

const solve = (input) => {
	const lines = input.map((a, i) => {
		const b = input[(i + 1) % input.length]

		const dir = a[0] == b[0] ? "v" : "h";

		let first;
		let last;

		if (dir == "h") {
			if (a[1] < b[1]) {
				first = a;
				last = b;
			} else {
				first = b;
				last = a;
			}
		} else {
			if (a[0] < b[0]) {
				first = a;
				last = b;
			} else {
				first = b;
				last = a;
			}
		}

		return { a: first, b: last, dir }
	});

	const verticalLines = lines.filter((line) => line.dir == "v");
	const horizontalLines = lines.filter((line) => line.dir == "h");

	const areas = input.flatMap((a, i) =>
		input.slice(i + 1).map(b => ({ a, b, area: calculateArea(a, b) }))
	);

	const areasSorted = areas.sort((a, b) => b.area - a.area);

	const noHitAreas = areasSorted.filter(({ a, b, area }) => {
		xStart = a[0] < b[0] ? a[0] : b[0];
		xEnd = a[0] > b[0] ? a[0] : b[0];
		yStart = a[1] < b[1] ? a[1] : b[1];
		yEnd = a[1] > b[1] ? a[1] : b[1];

		const vLineHit = verticalLines.find((line) =>
			line.a[0] > xStart && line.a[0] < xEnd && // horisontally inside
			line.a[1] <= yEnd && line.b[1] >= yStart  // vertically inside
		);

		const hLineHit = horizontalLines.find((line) =>
			line.a[1] > yStart && line.a[1] < yEnd &&
			line.a[0] <= xEnd && line.b[0] >= xStart
		)

		if (vLineHit) {
			debug("v line hit", vLineHit, a, b);
		} else if (hLineHit) {
			debug("h line hit", hLineHit, a, b);
		} else {
			return true;
		}
	})

	console.log(noHitAreas)

	return 0;
};

const run = (input) => {
	const processedInput = processRawInput(input);
	const result = solve(processedInput);
	return result;
};

module.exports = { solve, run };
