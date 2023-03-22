const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

// Initialize the client and set up the commands
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

// Loads all registered commands into the client
client.commands = new Collection();
const commandDir = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

// Iterates through the commands and adds the modules to the client
for (const file of commandFiles) {
    const filePath = path.join(commandDir, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// Handles the "Ready" event
client.once(Events.ClientReady, c => {
    console.log(`I'm alive!`);
})

// Handles interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName}!`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command ${interaction.commandName}: ${error}`);
    }
})

client.login(process.env.TOKEN);