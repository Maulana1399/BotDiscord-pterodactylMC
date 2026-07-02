const { SlashCommandBuilder } = require("discord.js");
const { power } = require("../services/pterodactyl");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Restart Minecraft Server"),

    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        try {

            await power("restart");

            await interaction.editReply("🔄 Server sedang direstart.");

        } catch {

            await interaction.editReply("❌ Gagal restart.");

        }

    }
};