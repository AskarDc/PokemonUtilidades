const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`Testeo`),

        async execute(interaction) {

            const modal = new ModalBuilder()
            .setTitle("Test form")
            .setCustomId(`modal`)

            const pregunta = new TextInputBuilder()
            .setCustomId(`contacto`)
            .setRequired(true)
            .setLabel(`Envia lo que quieres`)
            .setPlaceholder(`Aqui hay que poner el textaco`)
            .setStyle(TextInputStyle.Short);

            const preguntados = new TextInputBuilder()
            .setCustomId(`contactos`)
            .setRequired(true)
            .setLabel(`Envia lo que quieresss`)
            .setPlaceholder(`Aqui hay que poner el textacossss`)
            .setStyle(TextInputStyle.Paragraph);

            const contacto = new ActionRowBuilder().addComponents(pregunta)
            const contactos = new ActionRowBuilder().addComponents(preguntados)

            modal.addComponents(contacto, contactos)

            interaction.showModal(modal)

            const uno = interaction.fields.getTextInputValue('pregunta');
            const dos = interaction.fields.getTextInputValue('preguntados');

            const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Si`)
            .setDescription(`${uno}, ${dos}`);

            await interaction.reply({ embeds: [embed] })
    }
}