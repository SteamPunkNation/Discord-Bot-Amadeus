const { SlashCommandBuilder } = require('discord.js');
const { authors } = require('../command-jsons/quotes.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quoteoftheday')
		.setDescription('Amadeus will tell you a quote.'),
	async execute(interaction) {
		const { author, quotes } = authors[Math.floor(Math.random() * authors.length)];
		const randQuote = quotes[Math.floor(Math.random() * quotes.length)];

		await interaction.reply(`${randQuote}\n-${author}`);
	},
};