const fs = require("fs");
const path = require("path");
const { Events } = require("discord.js");

const commands = new Map();

const commandsPath = path.join(__dirname, "..", "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    commands.set(command.data.name, command);

}

module.exports = {

    name: Events.InteractionCreate,

    async execute(interaction) {

        if (!interaction.isChatInputCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) return;

        try {

            await command.execute(interaction);

        } catch (err) {

            console.error(err);

            if (interaction.replied || interaction.deferred) {

                await interaction.followUp({
                    content: "❌ Terjadi error.",
                    ephemeral: true,
                });

            } else {

                await interaction.reply({
                    content: "❌ Terjadi error.",
                    ephemeral: true,
                });

            }

        }

    },

};
