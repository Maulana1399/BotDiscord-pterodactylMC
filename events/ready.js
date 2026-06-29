const { Events, ActivityType } = require("discord.js");
const { checkPlayers } = require("../services/playerMonitor");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {

        console.log(`✅ ${client.user.tag} is online!`);

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

    }

};
