const { EmbedBuilder } = require("discord.js");
const { getServerState } = require("./pterodactyl");

let previousState = null;

const states = {

    running: {
        color: 0x57F287,
        title: "🟢 Server Started"
    },

    offline: {
        color: 0xED4245,
        title: "🔴 Server Stopped"
    },

    starting: {
        color: 0xFEE75C,
        title: "🟡 Server Starting"
    },

    stopping: {
        color: 0xFAA61A,
        title: "🟠 Server Stopping"
    }

};

async function checkServer(client) {

    try {

        const currentState = await getServerState();

        // Pertama kali bot hidup
        if (previousState === null) {

            previousState = currentState;
            return;

        }

        if (currentState === previousState) return;

        const channel = await client.channels.fetch(
            process.env.SERVER_LOG_CHANNEL_ID
        );

        const state =
            states[currentState] || {
                color: 0x5865F2,
                title: `ℹ️ ${currentState}`
            };

        const embed = new EmbedBuilder()
            .setColor(state.color)
            .setTitle(state.title)
            .addFields({
                name: "Status",
                value: currentState,
                inline: true
            })
            .setTimestamp();

        await channel.send({
            embeds: [embed]
        });

        previousState = currentState;

    } catch (err) {

        console.error(err);

    }

}

module.exports = {
    checkServer
};