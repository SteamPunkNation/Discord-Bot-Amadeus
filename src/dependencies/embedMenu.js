const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');

module.exports = async (interaction, pages, time = 30 * 1000) => {

    try{
        if (!interaction || !pages || !pages > 0) throw new Error('[Pages] Invalid Args!');

        await interaction.deferReply();

        if (pages.length === 1) {
            return await interaction.editReply({embeds: pages, components: [], fetchReply: true });
        }

        var index = 0;

        const help = new ButtonBuilder()
            .setLabel('Help')
            .setStyle(ButtonStyle.Link)
            .setURL('https://github.com/SteamPunkNation/Discord-Bot-Amadeus/issues');

        const close = new ButtonBuilder()
            .setCustomId('close')
            .setLabel('Close')
            .setStyle(ButtonStyle.Danger);

        const prev = new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('⬅️ Prev')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const next = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next ➡️')
            .setStyle(ButtonStyle.Primary);
        
        const pageCount = new ButtonBuilder()
            .setCustomId('pagecount')
            .setLabel(`${index + 1}/${pages.length}`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);


        const buttons = new ActionRowBuilder().addComponents([close, prev, pageCount, next, help]);

        const msg = await interaction.editReply({ embeds: [pages[index]], components: [buttons], fetchReply: true });

        const collector = await msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time
        });

        collector.on('collect', async i => {
            if (i.user.id != interaction.user.id) return await i.reply({ content: 'Nope!', ephemeral: true});

            await i.deferUpdate();

            if (i.customId === 'next') {
                if (index < pages.length - 1) index++;
            }
            else if (i.customId === 'prev') {
                if (index > 0) index--;
            }
            else if (i.customId === 'close') {
                return await interaction.deleteReply();
            }

            pageCount.setLabel(`${index + 1}/${pages.length}`);

            prev.setDisabled(index === 0);
            next.setDisabled(index === pages.length - 1);

            await msg.edit({ embeds: [pages[index]], components: [buttons]}).catch(err => {});

            collector.resetTimer();
        });

        collector.on("end", async () =>{
            await msg.edit({ embeds: [pages[index]], components: [] }).catch(err => {});
        });

        return msg;
    }

    catch(e){
        console.error(`${e}`);
    }
}