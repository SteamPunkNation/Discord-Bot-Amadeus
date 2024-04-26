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
        const channel = client.channels.cache.get(1233246369766969345);
        await interaction.reply('Successful');
        channel.send(msg);
        console.log(msg);
    },
};