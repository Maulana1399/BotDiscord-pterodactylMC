const { SlashCommandBuilder } = require("discord.js");
const { getResources } = require("../services/pterodactyl");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Lihat status server"),

    async execute(interaction) {

        try {

            const server = await getResources();

            await interaction.reply({

                embeds: [

                    {

                        color: 0x57F287,

                        title: "🖥️ Minecraft Server",

                        fields: [

                            {
                                name: "Status",
                                value: server.current_state,
                                inline: true
                            },

                            {
                                name: "CPU",
                                value: `${server.resources.cpu_absolute}%`,
                                inline: true
                            },

                            {
                                name: "RAM",
                                value: `${(
                                    server.resources.memory_bytes /
                                    1024 /
                                    1024
                                ).toFixed(0)} MB`,
                                inline: true
                            }

                        ]

                    }

                ]

            });

        } catch (e) {

            console.error(e);

            await interaction.reply("❌ Tidak bisa mengambil status server.");

        }

    }

};
