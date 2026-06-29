const { send } = require("./rcon");

async function say(message) {
    return await send(`say ${message}`);
}

async function list() {
    return await send("list");
}

async function whitelist() {
    return await send("whitelist list");
}

module.exports = {
    say,
    list,
    whitelist,
};