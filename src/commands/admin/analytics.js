const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { allowedRoles } = require('../../../config.json');
// ========================================================//
const help = new ButtonBuilder()
	.setLabel('Help')
	.setStyle(ButtonStyle.Link)
	.setURL('https://github.com/SteamPunkNation/Discord-Bot-Amadeus/issues');

const prev = new ButtonBuilder()
	.setCustomId('prev')
	.setLabel('⬅️ Prev')
	.setStyle(ButtonStyle.Primary)
	.setDisabled(true);

const next = new ButtonBuilder()
	.setCustomId('next')
	.setLabel('Next ➡️')
	.setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder()
	.addComponents(prev, next, help);
// ========================================================//
async function analyticsPage1(interaction) {
	const serverIcon = interaction.guild.iconURL({ dynamic: true });

	const totalNonBot = interaction.guild.members.cache.filter((m) => !m.user.bot).size;
	const totalMembersOnline = interaction.guild.members.cache.filter((m) => m.presence?.status == 'online' && !m.user.bot).size;
	const totalStaffOnline = interaction.guild.members.cache.filter((m) => m.roles.cache.some(role => allowedRoles.includes(role) && !m.user.bot)).size;
	const totalMembersWithRoles = 0;

	const analyticsEmbed = new EmbedBuilder()
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
				value: `${totalStaffOnline}`,
			},
			{
				name: 'Members with roles 📛',
				value: `${totalMembersWithRoles}`,
			},
		)
		.setTimestamp()
		.setFooter({ text: 'Page 1' });

	prev.setDisabled(false);
	next.setDisabled(false);

	return interaction.reply({ embeds: [analyticsEmbed], components: [row] });
}
// ========================================================//
async function analyticsPage2(interaction) {
	const serverIcon = interaction.guild.iconURL({ dynamic: true });

	const analyticsEmbed = new EmbedBuilder()
		.setTitle(`Analytics of ${interaction.guild.name}`)
		.setDescription(' ')
		.setColor('#00ff00')
		.setThumbnail(`${serverIcon}`)
		.addFields(
			{
				name: 'Messages per hour',
				value: '0',
			},
			{
				name: 'Joins in the last week',
				value: '0',
			},
			{
				name: 'Most recent joined member',
				value: '0',
			},
		)
		.setTimestamp()
		.setFooter({ text: 'Page 1' });

	return interaction.editReply({ embeds: [analyticsEmbed], components: [row] });
}
// ========================================================//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('analytics')
		.setDescription('Gives server analytics.'),


	// TODO list the following
	/* Total members
     * Online members
     * Current online staff
     * Members with specific roles
     * =============
     * Messages per hour
     * Joins in the last week
     * Most recent joined member
     * ===============
     * Total bans
     * Total kicks
     * Total mutes
     */
	// async execute(interaction) {
	//

	//     var response = await interaction.reply({
	//         components: [row],
	//     });

	//     const collectorFilter = i => i.user.id === interaction.user.id;

	//     try {
	//         var confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

	//         if (confirmation.customId === 'next'){
	//             await interaction.update({ content: 'Next', components: [row]});
	//         }
	//         else if (confirmation.customId === 'prev'){
	//             await interaction.update({ content: 'Prev', components: [row]});
	//         }
	//     }
	//     catch (e){
	//             console.log(e);
	//             await interaction.editReply({ content: 'No response after 1 min, cancelling', components: [] });
	//     }
	// },
	async execute(interaction) {
		try {
			const response = await analyticsPage1(interaction);

			const collectorFilter = i => i.user.id === interaction.user.id;

			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 3_600_000 });


			if (confirmation.customId === 'next') {
				await analyticsPage2(interaction);
				await confirmation.update({ content: '' });
			}
			else if (confirmation.customId === 'prev') {await confirmation.update({ content: 'Prev', embeds: [], components: [] });}
			else {await confirmation.update({ content: 'Default', embeds: [], components: [] });}

		}

		catch (e) {
			console.log(e);
			await interaction.editReply({ content: 'Please try again later.', components: [] });
		}
	},
};