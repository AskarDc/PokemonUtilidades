const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        const { author, guild, content } = message
        const { user } = client

        if (!guild || author.bot) return
        if (content.includes("@here") || content.includes("@everyone")) return
        if (!content.includes(user.id)) return
        
        return message.reply({

            embeds: [
                new EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: user.username, iconURL:user.displayAvatarURL() })
                    .setDescription(`Mi prefix aquí es **/**\nSi escribes </[ayuda]:{1055254831016726589}> `)
                    .setThumbnail(user.displayAvatarURL())
                    .setFooter({ text: "Bienvenida a Anime Remix" })
                    .setTimestamp()
            ],

            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://youtube.com/Zer0")
                        .setLabel("Invitame ^^")
                )
            ]
        }).then(msg => {
            setTimeout(() => {

                msg.delete().catch(err => {

                    if (err.code !== 100008) return console.log(err)

                })
            }, ms("20s"))
        })
    }
}