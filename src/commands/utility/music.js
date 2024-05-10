const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Plays music given a Youtube video'),
    async execute(interaction) {
        await interaction.reply('Test');
    },
};