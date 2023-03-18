const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { gifs } = require('../command-jsons/gifs.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gifme')
		.setDescription('Amadeus replies with a random Steins;Gate gif.'),
	async execute(interaction) {
		// eslint-disable-next-line no-const-assign
		const embedGif = gifs[Math.floor(Math.random() * gifs.length)];

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setImage(embedGif)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};