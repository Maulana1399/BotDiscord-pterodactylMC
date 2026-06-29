require("dotenv").config();
const { Rcon } = require("rcon-client");

let rcon = null;

async function connect() {

    if (rcon) return;

    rcon = await Rcon.connect({
        host: process.env.RCON_HOST,
        port: Number(process.env.RCON_PORT),
        password: process.env.RCON_PASSWORD,
    });

    rcon.on("end", () => {
        console.log("❌ RCON Lost");
        rcon = null;
    });

    console.log("✅ RCON Connected");
}

async function send(command) {

    try {

        if (!rcon) {
            await connect();
        }

        return await rcon.send(command);

    } catch (err) {

        console.log("🔄 RCON reconnect...");

        try {

            if (rcon) {
                await rcon.end().catch(() => {});
            }

        } catch {}

        rcon = null;

        await connect();

        return await rcon.send(command);

    }

}

async function disconnect() {
    if (!rcon) return;

    await rcon.end();
    rcon = null;

    console.log("❌ RCON Disconnected");
}

async function listPlayers() {
    return await send("list");
}

module.exports = {
    connect,
    disconnect,
    send,
    listPlayers,
};