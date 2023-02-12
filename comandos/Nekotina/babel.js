const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`babel`)
        .setDescription(`Comando para ejecutar en babel`)
        .addUserOption((option) =>
            option.setName('usuario')
            .setDescription('Selecciona el usuario.')
            .setRequired(true)
        ),
        async execute(interaction) {
            let user = interaction.options.getUser('usuario');
            const miembro = await interaction.guild.members.fetch(user.id);

            if(interaction.channel.id !== "1053748445762048140") return interaction.reply({ content: `Este canal no es para usar este comando`, ephemeral: true})

            const embed = new EmbedBuilder()
            .setColor("#f92850")
            .setTitle(`<:Pk_babel:1065731031115780227> **__¡Apertura de Babel en Poĸéмoɴ Kiɴɢdoм!__** <:Pk_babel:1065731031115780227>`)
            .setDescription(`> Se abrieron las Puertas de Babel en nuestro servidor!\n> Y queremos invitarte a disfrutar estas 12h en la **!pet zone 9** para conseguir ese preciado **Huevo de Thanatos!** <a:PK_Thanatos:1065725002399359039>\n\nÚnete a nosotros dejando tu **!capply Pokémon Kingdom** y disfrutar de todos nuestros beneficios! <a:Pk_Lolidance:962817039960014888>\n\n <:Pk_flecha:1065731462768369665> Contamos con un sistema de autoroles donde puedes personalizar tus roles.\n<:Pk_flecha:1065731462768369665> Sorteos activos en Nekotina.\n<:Pk_flecha:1065731462768369665> Club propio activo y organizado por Administradores.\n<:Pk_flecha:1065731462768369665> Beneficios por estar en el club.\n<:Pk_flecha:1065731462768369665> Dinamicas semanales`)
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setImage(`https://media.discordapp.net/attachments/1053748344469590076/1071890746233339904/Babel_Nekotina_Definitivo.png?width=690&height=304`)
            .setFooter({
                text: `Babel abierto por ${user.username}`,
                iconURL: `${user.displayAvatarURL()}`
            })

            await interaction.reply({ embeds: [embed] })
    }
}