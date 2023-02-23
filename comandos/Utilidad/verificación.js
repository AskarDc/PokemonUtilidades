const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verificacion')
        .setDescription('Verificate en el servidor'),
        
        async execute(interaction) {

            if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
                return await interaction.reply({ content: "No puedes ejecutar este comando.", ephemeral: true });
    
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`boton`)
                    .setLabel(`Verificate`)
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔗')
                )
                
                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel(`Normas`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.gg/GAEE3TwWjS`)
                    .setEmoji(`🔗`)
                );

                const embed = new EmbedBuilder()
                .setColor('#ff5050')
                .setTitle("Sistema de verificación")
                .setDescription(`Pulsa en el botón de abajo para verificarte en el servidor y obtener el rol de acceso a los canales.`)
                .setFooter(
                    { text: `Sistema de Verificación | Pokémon Kingdom`, 
                    iconURL: `https://media.discordapp.net/attachments/979331923547652126/993836249632751646/ServerLogo.gif?width=240&height=240`}
                )

                await interaction.reply({ embeds: [embed], components: [boton, boton2] })

                const collector = await interaction.channel.createMessageComponentCollector();

                collector.on(`collect`, async i => {

                    await i.update({ embeds: [embed], components: [boton, b] });

                    const member = i.member

                    member.roles.add("868825364544245760");
                })
            }
        };