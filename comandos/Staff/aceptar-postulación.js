const { SlashCommandBuilder, EmbedBuilder, CommandInteractionOptionResolver, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("aceptar-postulacion")
	.setDescription("Acepta la postulación de un miembro.")
	.addUserOption((option) =>
		option
			.setName("postulante")
			.setDescription("El postulante que pasará a la segunda fase.")
			.setRequired(true)
	)
    .addUserOption((option) =>
		option
			.setName("administrador")
			.setDescription("Tu ID.")
			.setRequired(true)
	),

	async execute(interaction) {
        if(!interaction.member.roles.cache.has("956676991246041179")) return interaction.reply({ content: "No tienes suficientes permisos.", ephemeral: true })

		const {channel, client, options} = interaction;
        const postulante = options.getUser("postulante")
        const administrador = options.getUser("administrador")

	if(postulante.id === "1055254831016726589") {
		return await interaction.reply({
			content: "No puedo enviarme MD a mi mismo ",
		})
		.catch((err) => {})
	}

    const embed = new EmbedBuilder()
        .setTitle("Postulación aceptada <a:Okay:1059246566420009011>")
        .setDescription(`<:Linea:1077038666163179541> ${postulante} has sido aceptado para pasar a la segunda fase, Únete al servidor de las postulaciones de la segunda fase pulsando en el botón de abajo, felicidades y esperamos verte pronto.`)
        .setColor(`#66f06b`)
        .setThumbnail(`https://media.discordapp.net/attachments/979331923547652126/993195736630046771/Logo_Server.png?width=206&height=206`)
        .setFooter({ text: `${postulante.username}`, iconURL: `${postulante.avatarURL()}` })
    
    const boton = new ActionRowBuilder()
    .addComponents(
         new ButtonBuilder()
        .setLabel(`Servidor de Postulaciones`)
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.gg/BKDVEj3MUb`)
        .setEmoji('🔗')
    );

	postulante.send({ content: `Felicidades por pasar a la segunda fase <:Happy:1077040403041222728> ${postulante}`, embeds: [embed], components: [boton] }).catch(async (err) => {
		console.log(err)

		return await interaction.editReply({
			content: `No puedo enviar el mensaje, prueba de nuevo.`,
		})
		.catch((err) => {})
	})

	await interaction.reply({
		content: `Exitosamente enviado MD a **${postulante}**!`,
        embeds: [embed],
        components: [boton],
        ephemeral: true
	})
    }
}