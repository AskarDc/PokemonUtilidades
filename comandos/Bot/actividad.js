const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("actividad-bot")
    .setDescription("Enseña el tiempo que el bot lleva encendido."),

    async execute(interaction, client) {
        const dias = Math.floor(client.uptime / 86400000)
        const horas = Math.floor(client.uptime / 3600000) % 24
        const minutos = Math.floor(client.uptime / 60000) & 60
        const segundos = Math.floor(client.uptime / 1000) % 60

        const embed = new EmbedBuilder()
        .setTitle(`Actividad de __${client.user.username}__`)
        .setColor("Random")
        .setTimestamp()
        .addFields(
            { name: "Actividad", value: ` \`${dias}\` días, \`${horas}\` horas, \`${minutos}\` minutos y \`${segundos}\` segundos.`}
        )

        interaction.reply({ embeds: [embed] })
    }
}