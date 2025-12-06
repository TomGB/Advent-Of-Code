#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const day = process.argv[2];
const flags = process.argv.slice(3); // Capture remaining flags like --debug

if (!day) {
  console.error(
    "Usage: npm run solve -- day04 [--debug|--info|--warn|--silent]"
  );
  process.exit(1);
}

// Validate day format
if (!/^day\d+$/.test(day)) {
  console.error("Invalid day format. Use: day04, day05, etc.");
  process.exit(1);
}

const dayDir = path.join(__dirname, "2025", day);
const runFile = path.join(dayDir, "run.js");

// Check if day exists
if (!fs.existsSync(runFile)) {
  console.error(`${day} not found at 2025/${day}/run.js`);
  process.exit(1);
}

// Run the day's run.js with all flags passed through
const child = spawn("node", [runFile, ...flags], {
  cwd: dayDir,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code);
});
