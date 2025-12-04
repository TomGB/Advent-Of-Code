const fs = require("fs");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim();

	const rounds = input.split("\n");
	const moves = rounds.map(round => {
		const [firstLetter, secondLetter] = round.split(" ");
		return { firstLetter, secondLetter };
	});

	return moves;
};

module.exports = loadData;
