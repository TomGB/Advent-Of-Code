const fs = require("node:fs");
const util = require("node:util");
const print = (txt) => console.log(util.inspect(JSON.stringify(txt)));

const data = fs.readFileSync("./test_input.txt", "utf8");

const lines = data.split("\n");

const characters = lines.map((line) => line.split(""));

