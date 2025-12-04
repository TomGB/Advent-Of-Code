const { times } = require("lodash");

const print = require("../print");
const loadData = require("./loadData");

const run = fileName => {
	const { stacks, instructions } = loadData(fileName);

	instructions.forEach(({ quantity, from, to }) => {
		const items = [];

		times(quantity, () => {
			items.push(stacks[from - 1].pop());
		});

		times(quantity, () => {
			stacks[to - 1].push(items.pop());
		});
	});

	const message = stacks.map(stack => stack.pop().substring(1, 2)).join("");

	print(message);
	return message;
};

run("input");

module.exports = run;
