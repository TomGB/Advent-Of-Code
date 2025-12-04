const fs = require("fs");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim();

	const lines = input.split("\n");

	return lines.map(line => {
		const [one, two] = line.split(",");
		const [aFrom, aTo] = one.split("-").map(x => parseInt(x));
		const [bFrom, bTo] = two.split("-").map(x => parseInt(x));

		return { aFrom, aTo, bFrom, bTo };
	});
};

module.exports = loadData;
