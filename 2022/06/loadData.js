const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim();

	return input.split("");
};

module.exports = loadData;
