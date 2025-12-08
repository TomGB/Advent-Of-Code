const fs = require("node:fs");
const path = require("node:path");

function normalizeLineEndings(content) {
  return content.replace(/\r\n/g, "\n");
}

function readInput(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return normalizeLineEndings(content);
}

function readInputFile(filename) {
  const callerDir = path.dirname(require.main.filename);
  const filePath = path.join(callerDir, "inputs", filename);
  return readInput(filePath);
}

module.exports = {
  normalizeLineEndings,
  readInput,
  readInputFile,
};
