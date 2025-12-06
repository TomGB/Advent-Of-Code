const fs = require("fs").promises;
const fsSync = require("fs");
const util = require("node:util");

const path = require("path");

function setupLogger(filePath = "./logs/app.log", defaultOptions = {}) {
  async function logAsync(line, options = {}) {
    const { timestamp = true, encoding = "utf8" } = options;
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    const ts = timestamp ? `[${new Date().toISOString()}] ` : "";
    const data = `${ts}${util.inspect(JSON.stringify(line))}\n`;
    await fs.appendFile(filePath, data, { encoding });
  }

  function log(line, options = {}) {
    const { timestamp = true, encoding = "utf8" } = options;
    const dir = path.dirname(filePath);
    fsSync.mkdirSync(dir, { recursive: true });
    const ts = timestamp ? `[${new Date().toISOString()}] ` : "";
    const data = `${ts}${util.inspect(JSON.stringify(line))}\n`;
    fsSync.appendFileSync(filePath, data, { encoding });
  }

  return { logAsync, log };
}

module.exports = { setupLogger };
