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

	console.log(commands);

	const fileTree = buildFileTree(commands);

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

	totalFileContents(fileTree);

	print(fileTotals);

	const maxFolderSize = 100000;

	const totalSize = fileTotals.reduce((a, value) => {
		if (value <= maxFolderSize) {
			return a + value;
		} else {
			return a;
		}
	}, 0);

	console.log(totalSize);
	return totalSize;
};

run("input");

//1205392 too low

module.exports = run;
