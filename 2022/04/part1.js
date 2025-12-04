const print = require("../print");
const loadData = require("./loadData");

const run = fileName => {
	const pairs = loadData(fileName);

	const numberOfOverlappingPairs = pairs.filter(
		({ aFrom, aTo, bFrom, bTo }) =>
			(aFrom >= bFrom && aTo <= bTo) || (aFrom <= bFrom && aTo >= bTo)
	).length;

	console.log(numberOfOverlappingPairs);
	return numberOfOverlappingPairs;
};

run("input");

module.exports = run;
