const { spawn } = require("child_process");

const child = spawn(process.execPath, ["testPartTwo.js"], { cwd: __dirname });

const timeoutMs = 5000; // 5s should be enough
const timeout = setTimeout(() => {
  console.error("Test timed out — possible infinite loop");
  child.kill("SIGKILL");
  process.exit(2);
}, timeoutMs);

child.stdout.on("data", (d) => process.stdout.write(d));
child.stderr.on("data", (d) => process.stderr.write(d));
child.on("exit", (code) => {
  clearTimeout(timeout);
  if (code === 0) {
    console.log("testPartTwo completed successfully");
    process.exit(0);
  } else {
    console.error("testPartTwo failed with code", code);
    process.exit(code || 1);
  }
});
