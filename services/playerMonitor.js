const { list } = require("./minecraft");

let previousPlayers = null;

function parsePlayers(result) {

    const match = result.match(
        /There are \d+ of a max of \d+ players online: ?(.*)/
    );

    if (!match) return [];

    if (!match[1]) return [];

    return match[1]
        .split(", ")
        .filter(Boolean);

}

async function checkPlayers(client) {

    try {

        const result = await list();

        const currentPlayers = parsePlayers(result);

        // Pertama kali bot hidup
        if (previousPlayers === null) {

            previousPlayers = currentPlayers;

            return;

        }

        const joined = currentPlayers.filter(
            p => !previousPlayers.includes(p)
        );

        const left = previousPlayers.filter(
            p => !currentPlayers.includes(p)
        );

        if (joined.length || left.length) {

            const channel = await client.channels.fetch(
                process.env.DISCORD_CHANNEL_ID
            );

            for (const player of joined) {
                await channel.send(`🟢 **${player}** joined the server`);
            }

            for (const player of left) {
                await channel.send(`🔴 **${player}** left the server`);
            }

        }

        previousPlayers = currentPlayers;

    } catch (err) {

        console.error(err);

    }

}

module.exports = {
    checkPlayers
};