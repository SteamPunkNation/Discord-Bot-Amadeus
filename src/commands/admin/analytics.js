	// TODO list the following
	/* Messages per hour
     * Joins in the last week
     * Most recent joined member
     * ===============
     * Total bans
     * Total kicks
     * Total mutes
     */

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedMenu = require('../../dependencies/embedMenu')
const { staffRoles, specialRoles } = require('../../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('analytics')
		.setDescription('Gives server analytics.'),

	async execute(interaction) {
		const embeds = [];
		const serverIcon = interaction.guild.iconURL({ dynamic: true });

		const totalNonBot = interaction.guild.members.cache.filter((m) => !m.user.bot).size;
		const totalMembersOnline = interaction.guild.members.cache.filter((m) => m.presence?.status != 'offline' && !m.user.bot).size;
		const onlineStaffCount = interaction.guild.members.cache.filter(member => member.presence?.status != 'offline' && member.roles.cache.some(role => staffRoles.includes(role.name))).size;
		const specialRoleCount = interaction.guild.members.cache.filter(member => member.roles.cache.some(role => specialRoles.includes(role.name))).size;
		// ========================================================//
		const analyticsEmbed1 = new EmbedBuilder()
		.setTitle(`Analytics of ${interaction.guild.name}`)
		.setDescription(' ')
		.setColor('#00ff00')
		.setThumbnail(`${serverIcon}`)
		.addFields(
			{
				name: 'Total Members 👪',
				value: `${totalNonBot}`,
			},
			{
				name: 'Online Members ☕',
				value: `${totalMembersOnline}`,
			},
			{
				name: '\u200B',
				value: '\u200B',
			},
			{
				name: 'Online Staff 👮',
				value: `${onlineStaffCount}`,
			},
			{
				name: 'Members with roles 📛',
				value: `${specialRoleCount}`,
			},
		)
		.setTimestamp()
		.setFooter({ text: 'Page 1' });
		// ========================================================//
		const analyticsEmbed2 = new EmbedBuilder()
		.setTitle(`Analytics of ${interaction.guild.name}`)
		.setDescription(' ')
		.setColor('#00ff00')
		.setThumbnail(`${serverIcon}`)
		.addFields(
			{
				name: 'Messages per hour ✉️',
				value: '0',
			},
			{
				name: '\u200B',
				value: '\u200B',
			},
			{
				name: 'Joins in the last week ✨',
				value: '0',
			},
			{
				name: 'Most recent joined member 🔎',
				value: '0',
			},
		)
		.setTimestamp()
		.setFooter({ text: 'Page 2' });
		// ========================================================//
		const analyticsEmbed3 = new EmbedBuilder()
		.setTitle(`Analytics of ${interaction.guild.name}`)
		.setDescription(' ')
		.setColor('#00ff00')
		.setThumbnail(`${serverIcon}`)
		.addFields(
			{
				name: 'Toatal Bans 🔨',
				value: '0',
			},
			{
				name: 'Total Kicks 🦵',
				value: '0',
			},
			{
				name: 'Current Mutes 🔇',
				value: '0',
			},
		)
		.setTimestamp()
		.setFooter({ text: 'Page 3' });
		// ========================================================//

		for (var i = 0; i < 3; i++){
			if (i + 1 == 1) embeds.push(analyticsEmbed1);
			if (i + 1 == 2) embeds.push(analyticsEmbed2);
			if (i + 1 == 3) embeds.push(analyticsEmbed3)
			// if (i + 1 == 3) embeds.push(new EmbedBuilder().setColor("Blurple").setDescription("This is page 3!"));
		}
		
		await embedMenu(interaction, embeds);
	},
};