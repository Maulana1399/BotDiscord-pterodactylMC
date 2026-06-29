const { run } = require("./rcon");

async function say(message) {
    return run(`say ${message}`);
}

async function list() {
    return run("list");
}

async function whitelist() {
    return run("whitelist list");
}

module.exports = {
    say,
    list,
    whitelist
};