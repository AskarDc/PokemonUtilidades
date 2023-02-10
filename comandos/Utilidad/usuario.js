const { SlashCommandBuilder, EmbedBuilder, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('usuario')
        .setDescription('Información acerca del usuario')
        .addUserOption((option) =>
            option.setName('usuario')
            .setDescription('Selecciona el usuario.')
            .setRequired(true)
        ),
        async execute(interaction) {
            let user = interaction.options.getUser('usuario');
            const miembro = await interaction.guild.members.fetch(user.id);

            const embed = new EmbedBuilder()
            .setColor('Random')
            .setThumbnail(user.displayAvatarURL())
            .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL(),
            })
            .addFields(
                {
                    name: 'Cuenta creada el',
                    value: `${user.createdAt.toLocaleString()}`,
                    inline: true
                },
                {
                    name: 'Unión al servidor:',
                    value: `${interaction.guild.joinedAt.toLocaleString()}`,
                    inline: true
                },
                {
                    name: 'ID usuario',
                    value: `${user.id}`,
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: `${miembro.roles.cache.map(r => r).join(' ')}`,
                    inline: true,
                },
                {
                    name: 'Tag usuario',
                    value: `${user.username}`,
                    inline: true,
                },
                {
                    name: 'El usuario es bot?',
                    value: `${user.bot}`,
                    inline: true,
                }
            )
            .setFooter({
                text: `Ejecutado por ${interaction.user.username}`,
                iconURL: `${interaction.user.avatarURL()}`
            })

            await interaction.reply({ embeds: [embed] });
        }
}