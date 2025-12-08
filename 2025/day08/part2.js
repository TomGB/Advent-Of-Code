const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
	const lines = input.trim().split("\n");
	return lines.map((line) => line.split(",").map(Number));
};

const solve = (input) => {
	const distances = getAllDistances(input).sort((a, b) => a.distance - b.distance);

	let circuits = [];
	let circuitId = 0;

	let lastPointA;
	let lastPointB;

	distances.some(({ pointA, pointB }) => {
		if (input.length == circuits.length) return true;

		lastPointA = pointA;
		lastPointB = pointB;

		const pointAInCircuits = circuits.find(({ point }) => point == pointA);
		const pointAId = pointAInCircuits?.id;
		const pointBInCircuits = circuits.find(({ point }) => point == pointB);
		const pointBId = pointBInCircuits?.id;

		if (pointAInCircuits && pointBInCircuits) {
			circuits = circuits.map(({ point, id }) => {
				if (id == pointBId) {
					return { point, id: pointAId };
				}
				return { point, id };
			});
			return;
		}
		
		if (pointAInCircuits) {
			circuits.push({ point: pointB, id: pointAInCircuits.id })
			return;
		}
		
		if (pointBInCircuits) {
			circuits.push({ point: pointA, id: pointBInCircuits.id })
			return;
		}

		circuitId++;
		circuits.push({ point: pointA, id: circuitId })
		circuits.push({ point: pointB, id: circuitId })
	});

	return lastPointA[0] * lastPointB[0]
};

const getDistance = (a, b) => {
	return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2) + Math.pow(b[2] - a[2], 2));
}

const getAllDistances = (points) => {
	const distances = [];
	points.forEach((pointA, indexA) => {
		points.slice(indexA + 1).forEach((pointB) => {
			const distance = getDistance(pointA, pointB);
			distances.push({ pointA, pointB, distance });
		});
	});
	return distances;
}

const run = (input) => {
	const processedInput = processRawInput(input);
	const result = solve(processedInput);
	return result;
};

module.exports = { solve, run, getDistance, processRawInput };
