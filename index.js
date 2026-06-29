require("dotenv").config();
const { disconnect } = require("./services/rcon");

const fs = require("fs");
const path = require("path");

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// Load semua event
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {

    const event = require(path.join(eventsPath, file));

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
    process.on("SIGINT", async () => {

        await disconnect();

        process.exit(0);

    });

    process.on("SIGTERM", async () => {

        await disconnect();

        process.exit(0);

    });
client.login(process.env.DISCORD_TOKEN);
