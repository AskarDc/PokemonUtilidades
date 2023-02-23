const { SlashCommandBuilder, EmbedBuilder, CommandInteractionOptionResolver, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registrar-poketwo')
        .setDescription('Registra donaciones.')
        .addStringOption(option => option.setName("miembro").setDescription("El miembro que ha donado.").setRequired(true))
        .addUserOption((option) =>
            option.setName('staff')
            .setDescription('El staff que ha recibido la donación.')
            .setRequired(true)
        )
        .addStringOption(option => option.setName("rol").setDescription("El rol que ha obtenido.").setRequired(true))
        .addStringOption(option => option.setName("pruebas").setDescription("Pruebas donación PONER ID MENSAJE.").setRequired(true))
        .addStringOption(option => option.setName("cantidad").setDescription("La cantidad que ha donado el miembro.").setRequired(true)),
        
        async execute(interaction) {

            if(!interaction.member.roles.cache.has("979315821518159893")) return interaction.reply({ content: "No tienes suficientes permisos.", ephemeral: true })

            let staff = interaction.options.getUser('staff');
            const miembro = interaction.options.getString('miembro');
            const rol = interaction.options.getString('rol');
            const pruebas = interaction.options.getString('pruebas');
            const cantidad = interaction.options.getString('cantidad');

            const embed = new EmbedBuilder()
            .setColor('#fa4747')
            .setAuthor({
                name: staff.tag,
                iconURL: staff.displayAvatarURL(),
            })
            .setTitle("Donación recibida <a:Okay:1059246566420009011> ")
            .addFields(
                { name: '<:FlechaRoja:995694340380835952> Donador:', value: `<@${miembro}> / ${miembro}`, inline: false },
                { name: '<:FlechaRoja:995694340380835952> Staff:', value: `${staff}`, inline: true },
                { name: '<:FlechaRoja:995694340380835952> Rol obtenido', value: `${rol}`, inline: true },
                { name: '<:FlechaRoja:995694340380835952> ID Mensaje', value: `${pruebas}`, inline: false },
                { name: '<:FlechaRoja:995694340380835952> Cantidad', value: `${cantidad}`, inline: true }
            )
            .setImage(`https://media.discordapp.net/attachments/979331923547652126/1076302162470129685/banner.png?width=360&height=144`)
            .setFooter({
                text: `Ejecutado por ${interaction.user.username}`,
                iconURL: `${interaction.user.avatarURL()}`
            })

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
	            .setLabel(`Ir al servidor!`)
	            .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/channels/716661037297959004/1060552972720947220/${pruebas}`)
                .setEmoji('1059247381369061386')
            )

            await interaction.reply({ embeds: [embed], components: [button] });
        }
}