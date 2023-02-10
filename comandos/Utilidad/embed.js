const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embedcreator')
    .setDescription(`Crear un embed personalizado`)
    .addStringOption(option => option.setName('titulo').setDescription('Detalla el titulo del embed').setRequired(true))
    .addStringOption(option => option.setName('descripcion').setDescription('Detalla la descripción del embed').setRequired(true))
    .addStringOption(option => option.setName('color').setDescription('Detalla el color del embed').setRequired(true).setMaxLength(7))
    .addStringOption(option => option.setName('imagen').setDescription('Detalla el imagen del embed').setRequired(false))
    .addStringOption(option => option.setName('thumbnail').setDescription('Detalla el thumbnail del embed').setRequired(false))
    .addStringOption(option => option.setName('field-nombre').setDescription('Detalla el field name del embed').setRequired(false))
    .addStringOption(option => option.setName('field-valor').setDescription('Detalla el fiel valor del embed').setRequired(false))
    .addStringOption(option => option.setName('footer').setDescription('Detalla el footer del embed').setRequired(false)),
    async execute (interaction) {

        const { options } = interaction;

        const etitulo = options.getString('titulo');
        const edescripcion = options.getString('descripcion');
        const ecolor = options.getString('color');
        const eimagen = options.getString('imagen');
        const ethumbnail = options.getString('thumbnail');
        const efieldn = options.getString('field-nombre') || ' ';
        const efieldv = options.getString('field-valor') || ' ';
        const efooter = options.getString('footer') || ' ';

        if (eimagen) {
            if (!eimagen.startsWith('http')) return await interaction.reply({ content: "No puedes usar este tipo de imagenes", ephemeral: true})
        }

        if (ethumbnail) {
            if (!ethumbnail.startsWith('http')) return await interaction.reply({ content: "No puedes usar este tipo de imagenes", ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setTitle(etitulo)
        .setDescription(edescripcion)
        .setColor(`0x${ecolor}`)
        .setImage(eimagen)
        .setThumbnail(ethumbnail)
        .setTimestamp()
        .addFields({ name: `${efieldn}`, value: `${efieldv}`})
        .setFooter({ text: `${efooter}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})

        await interaction.reply({ content: "El embed ha sido enviado abajo", ephemeral: true});

        await interaction.channel.send({ embeds: [embed] });
    }
}