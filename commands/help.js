const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Amadeus will tell you the list of commands.'),
	async execute(interaction) {
		await interaction.reply({ content: 'Here are the supported commands: ', ephemeral: true });
	},
};