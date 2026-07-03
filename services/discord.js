async function sendToChannels(client, ids, payload) {

    for (const id of ids) {

        try {

            const channel = await client.channels.fetch(id.trim());

            if (!channel) continue;

            await channel.send(payload);

        } catch (err) {

            console.error(`Failed send to ${id}:`, err.message);

        }

    }

}

module.exports = {
    sendToChannels
};