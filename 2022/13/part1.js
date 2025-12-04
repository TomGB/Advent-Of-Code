const { times, uniqWith, clone, isEqual } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const run = fileName => {
	const pairs = loadData(fileName);

	pairs.map((pair, i) => {
		const pairNum = i + 1;
		console.log(`== Pair ${pairNum} ==`);
		console.log(`- Compare ${pair[0]} vs ${pair[1]}`);
		// pair[0].map(item => {

		// })
	});
};

run("test");

module.exports = run;
