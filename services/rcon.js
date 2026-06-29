require("dotenv").config();
const { Rcon } = require("rcon-client");

async function run(command) {
    const rcon = await Rcon.connect({
        host: process.env.RCON_HOST,
        port: Number(process.env.RCON_PORT),
        password: process.env.RCON_PASSWORD,
    });

    try {
        return await rcon.send(command);
    } finally {
        await rcon.end();
    }
}

async function listPlayers() {
    return await run("list");
}

module.exports = {
    run,
    listPlayers,
};
