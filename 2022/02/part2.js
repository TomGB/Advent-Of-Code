const { invert } = require("lodash");
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

const WIN = "WIN";
const LOSE = "LOSE";
const DRAW = "DRAW";

const mapLetterToMove = {
	A: ROCK,
	B: PAPER,
	C: SCISSORS,
};

const mapLetterToOutcome = {
	X: LOSE,
	Y: DRAW,
	Z: WIN,
};

const losingResponses = {
	ROCK: SCISSORS,
	PAPER: ROCK,
	SCISSORS: PAPER,
};

const winningResponses = invert(losingResponses);

const run = fileName => {
	const moves = loadData(fileName);

	let totalPoints = 0;
	moves.map(({ firstLetter, secondLetter }) => {
		const theirMove = mapLetterToMove[firstLetter];
		const resultWanted = mapLetterToOutcome[secondLetter];

		if (resultWanted == LOSE) {
			myMove = losingResponses[theirMove];
		} else if (resultWanted == DRAW) {
			myMove = theirMove;
		} else {
			myMove = winningResponses[theirMove];
		}

		totalPoints += pointDictionary[myMove];

		if (theirMove == myMove) {
			totalPoints += 3;
		} else if (winningResponses[theirMove] == myMove) {
			totalPoints += 6;
		}
	});

	console.log(totalPoints);

	return totalPoints;
};

run("input");

module.exports = run;
