require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// All possible slash commands live here 
const commands = [];
// Get the relative path to the commands directory
const commandDir = path.join(__dirname, 'commands');
// Collect all of the files that end in .js
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

// Iterate through the files and add their JSON output to the commands array
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Creates a REST connection to the Discord API
const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

// Calls the REST api to register our slash commands with Discord
const register = async () => {
    try {
        console.log("Refreshing registered slash commands...");
        
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands});

        console.log("Successfully refreshed registered slash commands!");
    } catch (error) {
        console.error(`Encountered an error: ${error}`);
    }
}

register();