const { SlashCommandBuilder, EmbedBuilder, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queen')
        .setDescription('Ejecuta el embed de queen.')
        .addUserOption((option) =>
            option.setName('patrocinador')
            .setDescription('Selecciona el usuario que paga el queen.')
            .setRequired(true)
        ),
        async execute(interaction) {
            if(interaction.channel.id !== "1053748165754499102") return interaction.reply({ content: `Este canal no es para usar este comando`, ephemeral: true})
            let usuario = interaction.options.getUser('patrocinador');
            const miembro = await interaction.guild.members.fetch(usuario.id);

            const embed = new EmbedBuilder()
            .setColor('#f5f59a')
			.setTitle("¡Se ha activado el modo Premium!")
			.setDescription(`**${usuario.username}#${usuario.discriminator}.** activó las características premium para **Pokémon Kingdom #Road3k**`)
			.setImage(`https://media.discordapp.net/attachments/979331923547652126/1075948284935409774/Embed.gif`)
            .setAuthor({
                name: usuario.tag,
                iconURL: usuario.displayAvatarURL(),
            })
            .addFields(
                {
                    name: 'Fecha de término',
                    value: `||19 de marzo de 2023 1:13||`,
                    inline: true
                }
            )
            .setFooter({
                text: `Pokémon Kingdom #Road3k`,
                iconURL: `https://media.discordapp.net/attachments/979331923547652126/993836249632751646/ServerLogo.gif?width=240&height=240`
            })
			.setTimestamp()

            await interaction.reply({ content: `︵︵︵︵︵︵ ˙ ʚ  ஓ๑ <:pk_LogoServer:993822358857064530> ๑ஓ ɞ ˙  ︵︵︵︵︵︵\n\n Premium activado, muchas gracias a ${usuario} por la donación <:Pk_4PrettyLatias:890531618123550740>\n\n ︵︵︵︵︵︵ ˙ ʚ  ஓ๑ <:pk_LogoServer:993822358857064530> ๑ஓ ɞ ˙  ︵︵︵︵︵︵ `, embeds: [embed] });
        }
}