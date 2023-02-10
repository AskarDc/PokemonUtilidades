const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("admindelmes")
    .setDescription("Manda respuestas a un excel mediante la API")
    .addStringOption(option => option.setName('miembro').setDescription(`Tu ID de usuario`).setRequired(true))
    .addStringOption(option => option.setName('administrador').setDescription(`Administrador al que quieras votar`).setRequired(true))
    .addStringOption(option => option.setName('porque').setDescription(`Por qué razón deseas que gane?`).setRequired(true)),
    async execute (interaction) {

        await interaction.reply({ content: "Anotado tu votación <:Pk_XDUwU:1001580231531966574>", ephemeral: true});

        const miembro = interaction.options.getString('miembro')
        const administrador = interaction.options.getString('administrador')
        const porque = interaction.options.getString('porque')

        axios.post(`https://sheetdb.io/api/v1/nn80p5dlfs2bh`, {
            data: {
                Miembro: `${miembro}`,
                Administrador: `${administrador}`,
                Porqué: `${porque}`,
            }
        })
    }
}