const { each, range } = require("lodash");

const print = require("../print");
const loadData = require("./loadData");

const hasDuplicates = array => new Set(array).size !== array.length;

const run = (fileName, markerLength) => {
	const inputString = loadData(fileName);

	each(range(inputString.length - markerLength), index => {
		if (!hasDuplicates(inputString.slice(index, index + markerLength))) {
			console.log(index + markerLength);
			return false;
		}
	});
};

run("input", 4);
run("input", 14);

module.exports = run;
