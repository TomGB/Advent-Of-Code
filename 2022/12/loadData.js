const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const isUpperCase = string => /^[A-Z]*$/.test(string);

const converLetterToNumber = letter =>
	isUpperCase(letter)
		? letter.charCodeAt(0) - 64 + 26
		: letter.charCodeAt(0) - 96;

const loadData = fileName => {
	const inputRows = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim()
		.split("\n");

	let startX, startY, endX, endY;

	const grid = inputRows.map((row, y) => {
		const rowArray = row.split("");

		return rowArray.map((space, x) => {
			let visited = false;
			let isEnd = false;

			if (space === "S") {
				startX = x;
				startY = y;
				visited = true;
			}

			if (space === "E") {
				endX = x;
				endY = y;
				isEnd = true;
			}

			return {
				visited,
				height: converLetterToNumber(space),
				heightLetter: space,
				x,
				y,
				isEnd,
			};
		});
	});

	return {
		grid,
		startX,
		startY,
		endX,
		endY,
	};
};

module.exports = loadData;
