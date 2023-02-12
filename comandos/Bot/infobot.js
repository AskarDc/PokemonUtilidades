const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const cpuStat = require("cpu-stat");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("info-bot")
    .setDescription("Devuelve la información acerca del bot."),

    execute(interaction, client) {

        if(!interaction.member.roles.cache.has("979315821518159893")) return interaction.reply({ content: "No tienes suficientes permisos.", ephemeral: true })
        
        const dias = Math.floor(client.uptime / 86400000)
        const horas = Math.floor(client.uptime / 3600000) % 24
        const minutos = Math.floor(client.uptime / 60000) & 60
        const segundos = Math.floor(client.uptime / 1000) % 60

        cpuStat.usagePercent(function (error, percent) {
            if(error) return interaction.reply({ content: `${error}` })

            const memoryUsage = formatBytes = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const cpu = percent.toFixed(2)

            const embed = new EmbedBuilder()

            .setTitle("<:Wow:1065393115470516244> Información acerca del bot")
            .setColor("#df08fc")
            .setThumbnail('https://media.discordapp.net/attachments/1055255744238321678/1065384469294489741/e3a0ac988babeb7bb8c05083acc0c7ec.jpg?width=473&height=473')
            .addFields(
                { name: "<:Dev:1065385607775408148> Desarrollador", value: "! Zer0 🥀 |ᵖᵏ#9999", inline: true },
                { name: "<:Miembro:1065385705548828762> Usuario", value: `${client.user.username}`, inline: true },
                { name: "<:ID:1065385749899395142> ID", value: `${client.user.id}`, inline: true },
                { name: "<:Crear:1065385806572834867> Creación", value: "21/12/2022" },
                { name: "<:Help:1065385854450794537> Comando Help", value: "Slash `/ayuda`"},
                { name: "<:Enviado:1058059054842400848> Actividad", value: `\`${dias}\` días, \`${horas}\` horas, \`${minutos}\` minutos y \`${segundos}\` segundos.` },
                { name: "🏓 Ping", value: `${client.ws.ping}ms` },
                { name: "<:Node:1065386307532111965> Versión Node", value: `${node}` },
                { name: "<:CPU:1065392218908676186> Uso CPU", value: `${cpu}%` },
                { name: "<a:Cargando:1058058544571760670> Memoria Usada", value: `${memoryUsage}` },
            )
            .setFooter({
                text: `Ejecutado por ${interaction.user.username}`,
                iconURL: `${interaction.user.avatarURL()}`
            })

            interaction.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }
    }
}