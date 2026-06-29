const { SlashCommandBuilder } = require("discord.js");
const { listPlayers } = require("../services/rcon");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("online")
    .setDescription("Lihat player yang sedang online"),

    async execute(interaction) {
        try {

            const result = await listPlayers();

            const match = result.match(
                /There are (\d+) of a max of (\d+) players online: ?(.*)/
            );

            if (!match) {
                return interaction.reply(result);
            }

            const online = Number(match[1]);
            const max = Number(match[2]);
            const players = match[3];

            let description;

            if (online === 0) {
                description = "😴 Tidak ada player online.";
            } else {
                description = players
                    .split(", ")
                    .map(p => `🟢 ${p}`)
                    .join("\n");
            }

            await interaction.reply({
                embeds: [{
                    color: 0x57F287,
                    title: "👥 Online Players",
                    description,
                    footer: {
                        text: `${online} / ${max} Online`
                    }
                }]
            });

        } catch (err) {

            console.error(err);

            await interaction.reply("❌ Tidak bisa mengambil player online.");
        }
    }
};
