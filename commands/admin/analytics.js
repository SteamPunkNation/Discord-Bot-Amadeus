const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('analytics')
        .setDescription('Gives server analytics.'),


    //TODO list the following
    /* Total members
     * Online members
     * Current online staff
     * Members with specific roles
     * =============
     * Messages per hour
     * Joins in the last week
     * ===============
     * Total bans
     * Total kicks
     * Total mutes
     */
    async execute(interaction) {
        const help = new ButtonBuilder()
            .setLabel('Help')
            .setStyle(ButtonStyle.Link)
            .setURL('https://github.com/SteamPunkNation/Discord-Bot-Amadeus/issues')

        const prev = new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('Prev')
            .setStyle(ButtonStyle.Primary)

        const next = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(prev, next, help);

        var response = await interaction.reply({
            components: [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            var confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'next'){
                await interaction.update({ content: 'Next', components: [row]});
            }
            else if (confirmation.customId === 'prev'){
                await interaction.update({ content: 'Prev', components: [row]});
            }
        }
        catch (e){
                console.log(e);
                await interaction.editReply({ content: 'No response after 1 min, cancelling', components: [] });
        }
    },
};