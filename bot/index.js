const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { setComms } = require('./utils/utils');

// Initialize the client and set up the commands
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
setComms(client);


client.once(Events.ClientReady, c => {
    console.log(`I'm alive!`);
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command)
    {
        console.error(`No command matching ${interaction.commandName}!`);
        return;
    }

    try
    {
        await command.execute(interaction);
    }
    catch (error)
    {
        console.error(`Error executing command ${interaction.commandName}: ${error}`);
    }
})

client.login(process.env.TOKEN);