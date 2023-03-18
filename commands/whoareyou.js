const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoareyou')
		.setDescription('Tells you about Amadeus.'),
	async execute(interaction) {
		await interaction.reply(
			`I am an AI developed by Kurisu Makise and her collegue Mahoe Hiyajo.
It's my pleasure to assist you.`);
	},
};