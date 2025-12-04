const { set, result, forIn } = require("lodash");
const { exec } = require("child_process");
const fs = require("fs");

const print = require("../print");
const loadData = require("./loadData");

const generateCommands = commands => {
	const commandsToRun = [];

	commands.forEach(({ command, dir, fileSize, fileName }) => {
		if (command == "cd") {
			if (dir == "/") {
				commandsToRun.push(
					"cd /Users/thomasbanister/Documents/advent-of-code-2022/07/tree"
				);
			} else {
				commandsToRun.push(`${command} ${dir}`);
			}
			return;
		}
		if (command == "mkdir") {
			commandsToRun.push(makeDir(fileName));
			return;
		}
		if (fileName) {
			commandsToRun.push(makeFile(fileName, fileSize));
			return;
		}
	});

	return commandsToRun;
};

const makeFile = (name, size) => `dd bs=${size} seek=1 of=${name} count=0`;
const makeDir = name => `mkdir ${name}`;

/*
	create directory: mkdir xxx
	create file: mkfile -n b xxx
	move to root: cd /Users/thomasbanister/Documents/advent-of-code-2022/07/tree
*/

const run = async (fileName, markerLength) => {
	const commands = loadData(fileName);

	console.log(commands);

	const commandsToRun = generateCommands(commands);

	try {
		fs.writeFileSync("./commands.sh", commandsToRun.join("\n"));
		// file written successfully
	} catch (err) {
		console.error(err);
	}

	// const fileTotals = [];

	// const totalFileContents = folder => {
	// 	let totalSize = 0;
	// 	forIn(folder, (value, key) => {
	// 		if (typeof value == "object") {
	// 			const totalForFolder = totalFileContents(value);
	// 			fileTotals.push(totalForFolder);
	// 			totalSize += totalForFolder;
	// 			return;
	// 		}

	// 		totalSize += value;
	// 	});

	// 	return totalSize;
	// };

	// totalFileContents(fileTree);

	// print(fileTotals);

	// const maxFolderSize = 100000;

	// const totalSize = fileTotals.reduce((a, value) => {
	// 	if (value <= maxFolderSize) {
	// 		return a + value;
	// 	} else {
	// 		return a;
	// 	}
	// }, 0);

	// console.log(totalSize);
	// return totalSize;
};

run("test");

//1205392 too low

module.exports = run;
