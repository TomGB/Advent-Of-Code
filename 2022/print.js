const util = require("util");

const print = item => {
	console.log(
		util.inspect(item, {
			showHidden: false,
			depth: null,
			colors: true,
			maxArrayLength: null,
		})
	);
};

module.exports = print;
