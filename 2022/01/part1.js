const print = require("../print");
const loadData = require("./loadData");

const run = fileName => {
	const foodItems = loadData(fileName);

	const sumOfFoodItems = foodItems.map(elf =>
		elf.reduce((totalSoFar, foodItem) => totalSoFar + foodItem, 0)
	);

	const sortedElves = sumOfFoodItems
		.sort((a, b) => a - b)
		.reverse()
		.slice(0, 3);

	return sortedElves[0];
};

module.exports = run;
