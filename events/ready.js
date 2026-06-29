const { Events, ActivityType } = require("discord.js");

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

    }

};
