process.on("exit", (code) =>
    console.log("The process ended with code " + code)
)

process.on("uncaughtException", (error) =>
    console.log("An error has occurred: " + error.message)
)

console.log("Process PID: " + process.pid)
process.pid()
process.exit(1)