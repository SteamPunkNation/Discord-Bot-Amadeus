const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendmsgasbot')
        .setDescription('Sends message as the bot.')
        //hi
        .addStringOption(option =>
            option
                .setName('msg')
                .setDescription('Message for the bot to send.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        const msg = interaction.options.getString('msg');
        console.log(msg);
        await interaction.deferReply();
        await interaction.deleteReply();
        await interaction.channel.send(msg);
    },
};