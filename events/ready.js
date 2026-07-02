const { Events, ActivityType } = require("discord.js");
const { checkPlayers } = require("../services/playerMonitor");
const { connect } = require("../services/rcon");
const { checkServer } = require("../services/serverMonitor");

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {

        console.log(`✅ ${client.user.tag} is online!`);

        // await connect();

        client.user.setPresence({
            activities: [
                {
                    name: "Minecraft Server",
                    type: ActivityType.Watching
                }
            ],
            status: "online"
        });

        setInterval(() => {
            checkPlayers(client);
        }, 5000);

        setInterval(() => {
            checkServer(client);
        }, 5000);

    }

};