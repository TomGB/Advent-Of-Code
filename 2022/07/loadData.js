const { chunk, mapValues } = require("lodash");
const fs = require("fs");

const print = require("../print");

const loadData = fileName => {
	const input = fs
		.readFileSync(`${__dirname}/${fileName}.txt`, "utf8")
		.trim()
		.split("\n");

	return input.map(line => {
		const lineIsLsCommand = line.match(/\$ (\w+)$/);
		const lineIsCdCommand = line.match(/\$ (\w+) (.+)/);

		if (lineIsLsCommand) {
			return { command: "ls" };
		}
		if (lineIsCdCommand) {
			return { command: "cd", dir: lineIsCdCommand[2] };
		}

		const [firstPart, fileName] = line.split(" ");

		if (firstPart == "dir") return { command: "mkdir", fileName };

		return {
			fileSize: parseInt(firstPart),
			fileName,
		};
	});
};

// console.log(loadData("test"));

module.exports = loadData;
