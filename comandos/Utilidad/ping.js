const { SlashCommandBuilder } = require('discord.js');
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping Bot'),
    async execute(client, interaction) {
        // interaction.guild es lo que representa el servidor
        await interaction.reply(`Pong! ${client.ws.ping}`);
    },
}