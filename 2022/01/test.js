const { expect } = require("@jest/globals");
const part1 = require("./part1");
const part2 = require("./part2");

beforeEach(() => {
	global.console = require("console");
});

const expectedAnswers = {
	part1: {
		test: 24000,
		challenge: 67450,
	},
	part2: {
		test: 45000,
		challenge: 199357,
	},
};

test("part 1 with test input", () => {
	expect(part1("testInput")).toEqual(expectedAnswers.part1.test);
});

test("part 1 with challenge input", () => {
	expect(part1("input")).toEqual(expectedAnswers.part1.challenge);
});

test("part 2 with test input", () => {
	expect(part2("testInput")).toEqual(expectedAnswers.part2.test);
});

test("part 2 with challenge input", () => {
	expect(part2("input")).toEqual(expectedAnswers.part2.challenge);
});
