const { SlashCommandBuilder } = require("discord.js");
const { say } = require("../services/rcon");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Kirim pesan ke chat Minecraft")
        .addStringOption(option =>
            option
                .setName("pesan")
                .setDescription("Pesan yang akan dikirim")
                .setRequired(true)
        ),

    async execute(interaction) {

        const message = interaction.options.getString("pesan");

        try {

            await say(message);

            await interaction.reply({
                content: `✅ Pesan berhasil dikirim:\n> ${message}`,
                ephemeral: true,
            });

        } catch (err) {

            console.error(err);

            await interaction.reply({
                content: "❌ Gagal mengirim pesan ke Minecraft.",
                ephemeral: true,
            });

        }

    },
};