const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gimnasio')
        .setDescription('Mensaje de gimnasios')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('El canal que quieres nukear')),
        
        async execute(interaction) {

            if(!interaction.member.roles.cache.has("1045653502002745344")) {
                return interaction.reply({ content: "No puedes ejecutar este comando.", ephemeral: true });
            }

            const dcchannel = interaction.options.getChannel("canal")

            let array = []
  
            array.push(interaction.guild.channels.cache.find(m => m.id == dcchannel.id))
    
            interaction.guild.channels.cache.find(m => m.id == dcchannel.id).delete()
    
                 const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle("¡Gimnasio disponible! <:Pk_LucarioNice:1066401403498659900>")
                .setDescription(`> Este gimnasio está disponible, si quieres reclamarlo, puedes mandar un mensaje privado a <@!917082695853543476>.`)
                .setThumbnail(`https://media.discordapp.net/attachments/979331923547652126/993195736630046771/Logo_Server.png?width=206&height=206`)
                .setFooter({
                    text: `Sistema de Gimnasios | Administración de Gimnasios Pokémon Kingdom`,
                    iconURL: `https://media.discordapp.net/attachments/979331923547652126/993836249632751646/ServerLogo.gif?width=240&height=240`,
                });
    
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel(`Normas Gimnasios`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/channels/716661037297959004/951167956086296596/1062564619631206490`)
                    .setEmoji('🔗')
                );
    
                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel(`Contacto Modmail!`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/channels/@me/917085527629508688`)
                    .setEmoji('993822358857064530')
                );
    
                interaction.guild.channels.create({
              name: array[0].name,
              topic: array[0].topic,
              position: array[0].position,
              parent: array[0].parentId,
              type: ChannelType.GuildText
            }).then((channel) => {   interaction.guild.channels.cache.find(m => m.id == channel.id).send({ embeds: [embed], components: [boton, boton2] })   })
    }, catch(error) {
        console.log("Error en el comando." + error);
    }
}