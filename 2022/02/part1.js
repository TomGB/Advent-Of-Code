const print = require("../print");
const loadData = require("./loadData");

const pointDictionary = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
};

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

const mapLetterToMove = {
	X: ROCK,
	Y: PAPER,
	Z: SCISSORS,
	A: ROCK,
	B: PAPER,
	C: SCISSORS,
};

const run = fileName => {
	const moves = loadData(fileName);

	let totalPoints = 0;
	moves.map(({ firstLetter, secondLetter }) => {
		const theirMove = mapLetterToMove[firstLetter];
		const myMove = mapLetterToMove[secondLetter];

		totalPoints += pointDictionary[myMove];

		// DRAW
		if (theirMove == myMove) {
			totalPoints += 3;
		}
		// Win
		else if (
			(theirMove == ROCK && myMove == PAPER) ||
			(theirMove == PAPER && myMove == SCISSORS) ||
			(theirMove == SCISSORS && myMove == ROCK)
		) {
			totalPoints += 6;
		}
	});

	console.log(totalPoints);

	return totalPoints;
};

run("input");

module.exports = run;
