const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('analytics')
        .setDescription('Gives server analytics.'),
    async execute(interaction) {
        await interaction.reply('TEST');
    },
};