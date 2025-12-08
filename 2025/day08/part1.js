const { debug } = require("../../lib/debug");

const processRawInput = (input) => {
	const lines = input.trim().split("\n");
	return lines.map((line) => line.split(",").map(Number));
};

const solve = (input, productNumber) => {
	const distances = getAllDistances(input).sort((a, b) => a.distance - b.distance);

	const shortestXConnections = distances.slice(0, productNumber);

	let circuits = [];
	let circuitId = 0;

	shortestXConnections.map(({ pointA, pointB }) => {
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

	const circuitSizes = circuits.reduce((acc, { id }) => {
		if (acc[id]) {
			acc[id]++;
		} else {
			acc[id] = 1;
		}

		return acc;
	}, {})

	const productOfTopThree = Object.values(circuitSizes).sort((a, b) => b - a).slice(0,3).reduce((acc, item) => acc * item, 1);

	return productOfTopThree;
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

const run = (input, productNumber) => {
	const processedInput = processRawInput(input);
	const result = solve(processedInput, productNumber);
	return result;
};

module.exports = { solve, run, getDistance, processRawInput };
