const { set, result, forIn } = require("lodash");
const print = require("../print");
const loadData = require("./loadData");

const buildFileTree = commands => {
	const fileTree = {};

	let PWD = [];

	commands.forEach(({ command, dir, fileSize, fileName }) => {
		if (command == "cd") {
			if (dir == "/") {
				PWD = [];
			} else if (dir == "..") {
				PWD.pop();
			} else {
				PWD.push(dir);
			}
			return;
		}
		if (fileName) {
			set(fileTree, [...PWD, fileName].join("."), fileSize);
		}
	});

	return fileTree;
};

const run = (fileName, markerLength) => {
	const commands = loadData(fileName).filter(
		({ fileSize }) => typeof fileSize === "undefined" || !isNaN(fileSize)
	);

	const fileTree = buildFileTree(commands);

	console.log(fileTree);

	const fileTotals = [];

	const totalFileContents = folder => {
		let totalSize = 0;
		forIn(folder, (value, key) => {
			if (typeof value == "object") {
				const totalForFolder = totalFileContents(value);
				fileTotals.push(totalForFolder);
				totalSize += totalForFolder;
				return;
			}

			totalSize += value;
		});

		return totalSize;
	};

	const sizeOfAllFiles = totalFileContents(fileTree);

	console.log({ sizeOfAllFiles });

	const totalDiskSpace = 70000000;
	const sizeRequired = 30000000;

	const sizeToDelete = Math.abs(
		totalDiskSpace - sizeOfAllFiles - sizeRequired
	);

	console.log({ sizeToDelete });

	const foldersBigEnough = fileTotals.filter(size => size > sizeToDelete);

	const sorted = foldersBigEnough.sort((a, b) => a - b);

	console.log(sorted[0]);
	return sorted[0];

	// return totalSize;
};

run("input");

//1205392 too low

module.exports = run;
