const fs = require("fs");

const splitLineInHalf = inputline => {
	const firsthalf = inputline.slice(0, inputline.length / 2);
	console.log(firsthalf);
	const secondhalf = inputline.slice(inputline.length / 2, inputline.length);
	console.log(secondhalf);
	return { firsthalf, secondhalf };
};

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim();

	return input.split("\n");
};

module.exports = loadData;
