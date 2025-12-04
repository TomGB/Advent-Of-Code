const fs = require("fs");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim();

	const listOfElves = input.split("\n\n");

	const foodItems = listOfElves.map(foodCalorieList =>
		foodCalorieList.split("\n").map(string => parseInt(string))
	);

	return foodItems;
};

module.exports = loadData;
