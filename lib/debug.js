// Debug logger with level control
// Usage: set via process.env.DEBUG_LEVEL or setLevel()
// Levels: 'silent' (0), 'error' (1), 'warn' (2), 'info' (3), 'debug' (4)

const LEVELS = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

let currentLevel = LEVELS.info; // default: only errors

function setLevel(level) {
  if (typeof level === "string") {
    currentLevel = LEVELS[level.toLowerCase()];
  } else {
    currentLevel = level;
  }
}

function getLevel() {
  return currentLevel;
}

function log(level, ...args) {
  const levelValue =
    typeof level === "string" ? LEVELS[level.toLowerCase()] : level;
  if (levelValue <= currentLevel) {
    const prefix = level.toUpperCase().padEnd(6);
    console.log(`[${prefix}]`, ...args);
  }
}

function debug(...args) {
  log("debug", ...args);
}

function info(...args) {
  log("info", ...args);
}

function warn(...args) {
  log("warn", ...args);
}

function error(...args) {
  log("error", ...args);
}

function initFromArgs() {
  // Parse command-line arguments for log level
  // Usage: node script.js [--debug|--info|--warn|--silent|--error]
  const args = process.argv.slice(2);
  const debugArg = args.find((arg) => arg.startsWith("--"));
  if (debugArg) {
    const level = debugArg.replace("--", "");
    setLevel(level);
  }
}

module.exports = {
  debug,
  info,
  warn,
  error,
  setLevel,
  getLevel,
  initFromArgs,
  LEVELS,
};
