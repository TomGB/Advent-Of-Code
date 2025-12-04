const print = require("../print");
const loadData = require("./loadData");

const run = fileName => {
	const foodItems = loadData(fileName);

	const sumOfFoodItems = foodItems.map(elf =>
		elf.reduce((totalSoFar, foodItem) => totalSoFar + foodItem, 0)
	);

	const firstThree = sumOfFoodItems
		.sort((a, b) => a - b)
		.reverse()
		.slice(0, 3);

	return firstThree.reduce((a, b) => a + b, 0);
};

module.exports = run;
