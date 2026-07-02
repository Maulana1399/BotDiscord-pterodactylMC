const { SlashCommandBuilder } = require("discord.js");
const { power } = require("../services/pterodactyl");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("Start Minecraft Server"),

    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        try {

            await power("start");

            await interaction.editReply("🟢 Server sedang dinyalakan.");

        } catch {

            await interaction.editReply("❌ Gagal start server.");

        }

    }
};