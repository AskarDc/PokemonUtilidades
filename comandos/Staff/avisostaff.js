const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("avisostaff")
	.setDescription("Warnea al staff que desees")
	.addUserOption((option) =>
		option
			.setName("objetivo")
			.setDescription("El usuario al que deseas enviar MD")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("tipo-advertencia")
			.setDescription("Imcumplimiento de?")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("explicación")
			.setDescription("La explicación de dicha sanción.")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("comomejorar")
			.setDescription("Como puede mejorar el usuario.")
			.setRequired(true)
	),

	async execute(interaction) {

		if(!interaction.member.roles.cache.has("1021145146215116893")) return interaction.reply({ content: "No tienes suficientes permisos.", ephemeral: true })
		
		const {channel, client, options} = interaction;


	const usuario = options.getMember("objetivo")
	const advertencia = options.getString("tipo-advertencia")
	const explicar = options.getString("explicación")
	const mejorar = options.getString("comomejorar")

	if(usuario.id === "1073750578750029825") {
		return await interaction.reply({
			content: "No puedo enviarme MD a mi mismo ",
		})
		.catch((err) => {})
	}

    const embedserver = new EmbedBuilder()
        .setTitle("<:StaffWarnIcon:1074154030173003826> Sistema Staff Pokémon Kingdom")
        .setAuthor({ name: `Avisado por ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` })
		.setColor("#fe5555")
		.setDescription(`<a:Estrellas4:1074117320865230919> **〉Advertencia por ${advertencia}**\n\n> <a:Estrellas2:1074116785713983600> __**Explicación:**__\n > ${explicar}\n\n> <a:Estrellas3:1074116929029144706> __**¿Cómo mejorar?**__ \n > ${mejorar}\n\n ***- Recuerda no cometer este error denuevo y aprovecha para recapacitar no para deprimir.***`)
		.setFooter({ text: 'Pokémon Kingdom Staff | Developers', iconURL: `https://media.discordapp.net/attachments/979331923547652126/996365980051710033/Nuevo_Gif_Server.gif?width=270&height=270`});

    const embedmd = new EmbedBuilder()
	.setTitle("<:StaffWarnIcon:1074154030173003826> Sistema Staff Pokémon Kingdom")
	.setAuthor({ name: `Avisado por ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` })
	.setColor("#fe5555")
	.setDescription(`<a:Estrellas4:1074117320865230919> **〉Advertencia por ${advertencia}**\n\n> <a:Estrellas2:1074116785713983600> __**Explicación:**__\n > ${explicar}\n\n> <a:Estrellas3:1074116929029144706> __**¿Cómo mejorar?**__ \n > ${mejorar}\n\n ***- Recuerda no cometer este error denuevo y aprovecha para recapacitar no para deprimir.***`)
	.setFooter({ text: 'Pokémon Kingdom Staff | Developers', iconURL: `https://media.discordapp.net/attachments/979331923547652126/996365980051710033/Nuevo_Gif_Server.gif?width=270&height=270`});

	usuario.send({ content: `Tienes una advertencia nueva ${usuario}`, embeds: [embedmd] }).catch(async (err) => {
		console.log(err)

		return await interaction.editReply({
			content: `No puedo enviar el mensaje, prueba de nuevo.`,
		})
		.catch((err) => {})
	})

	await interaction.reply({ content: `${usuario}`, embeds: [embedserver] })
	.catch((err) => {})
	},
};