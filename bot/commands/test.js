const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test Command!'),
    async execute (interaction)
    {
        await interaction.reply("Hey there")
    }
}