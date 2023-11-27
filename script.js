const { spawn } = require("child_process");

console.log("*** SPECTAQL STARTED ***");

const spectaqlProcess = spawn("npx", ["spectaql", "-D", "config.yml"]);

const timeoutId = setTimeout(() => {
  console.log("*** SPECTAQL ENDED AFTER 20 SECONDS ***");
  spectaqlProcess.kill("SIGTERM");
  process.exit();
}, 20000);

spectaqlProcess.on("exit", (code, signal) => {
  console.log(`Spectaql process exited with code ${code} and signal ${signal}`);
  clearTimeout(timeoutId);
});

spectaqlProcess.on("error", (err) => {
  console.error(`Error starting spectaql: ${err.message}`);
  process.exit(1);
});

spectaqlProcess.stdout.on("data", (data) => {
  console.log(`Spectaql stdout: ${data}`);
  if (data.includes("Waiting...")) {
    console.log("*** SPECTAQL ENDED ***");
    spectaqlProcess.kill("SIGTERM");
    process.exit();
  }
});

spectaqlProcess.stderr.on("data", (data) => {
  console.error(`Spectaql stderr: ${data}`);
});
