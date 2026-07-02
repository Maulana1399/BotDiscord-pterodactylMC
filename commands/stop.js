const { SlashCommandBuilder } = require("discord.js");
const { power } = require("../services/pterodactyl");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop Minecraft Server"),

    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        try {

            await power("stop");

            await interaction.editReply("🛑 Server sedang dimatikan.");

        } catch {

            await interaction.editReply("❌ Gagal stop server.");

        }

    }
};