require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = [];

const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(__dirname, "commands", file));

    commands.push(command.data.toJSON());

}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const guilds = process.env.GUILD_IDS
    .split(",")
    .map(id => id.trim());

(async () => {

    try {

        console.log("⏳ Registering slash commands...");

        for (const guildId of guilds) {

            await rest.put(

                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    guildId
                ),

                { body: commands }

            );

            console.log(`✅ Commands deployed to guild ${guildId}`);

        }

        console.log("🎉 Done!");

    } catch (err) {

        console.error(err);

    }

})();