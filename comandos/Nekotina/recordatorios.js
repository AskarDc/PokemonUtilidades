const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`recordatorios`)
        .setDescription(`Este es un ejemplo de la guía`),
        async execute(interaction) {

            if(!interaction.member.roles.cache.has("979315821518159893")) return interaction.reply({ content: "No tienes suficientes permisos.", ephemeral: true })

            const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle('Sistema de recordatorios')
            .setDescription(`*Lista de todos los recordatorios del servidor*`)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .addFields({ name: "<a:FlechaNegra:1066851489521356840> **__Farmeo__** <:Pk_Emp:1067968652986564678> ", value: "```work    -    1h\nfarm    -    6m\npet2    -    45m\npet    -    30m\ncrime    -    1m```", inline: true})
            .addFields({ name: "<a:FlechaNegra:1066851489521356840> **__Haste__** <:Pk_huevo:1065731293616295996> ", value: "```hwork    -    30m\n\nhmine    -    1m18s\nhfish    -    1m18m\nhpet    -    15m```", inline: true})
            .addFields({ name: "<a:FlechaNegra:1066851489521356840> **__Extra__** <a:Pk_thanatos:1065731540849528922> ", value: "```claim    -    24h\nweekly    -    7d\ncajita    -    14d\ndaily    -    12h\nvtvote    -    12h\nwfvote    -    6h\nhbvote    -    6h\nrep    -    6h\npb    -    1m```", inline: false})
            .setTimestamp()
            .setFooter({
                text: `Pedido por ${interaction.user.username}`,
                iconURL: `${interaction.user.avatarURL()}`
            })

            await interaction.reply({ embeds: [embed] })
    }
}