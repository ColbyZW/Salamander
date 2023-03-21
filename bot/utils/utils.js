const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

// Helper function to load all of the slash commands into the client
const setComms = (client) => {
    client.commands = new Collection();
    const commandDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

    for (const file of commandFiles)
    {
        const filePath = path.join(commandDir, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }
}

module.exports = { setComms }