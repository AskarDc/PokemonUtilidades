const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("staffdelmes")
    .setDescription("Manda respuestas a un excel mediante la API")
    .addStringOption(option => option.setName('staff').setDescription(`Tu ID de usuario`).setRequired(true))
    .addStringOption(option => option.setName('usuario').setDescription(`Usuario al que quieras votar`).setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription(`Por qué razón deseas que gane?`).setRequired(true)),
    async execute (interaction) {

        await interaction.reply({ content: "Anotado tu votación <:Pk_XDUwU:1001580231531966574>", ephemeral: true});

        const staff = interaction.options.getString('staff')
        const miembro = interaction.options.getString('usuario')
        const razón = interaction.options.getString('razon')

        axios.post(`https://sheetdb.io/api/v1/m5lzf26i7lnx9`, {
            data: {
                Staff: `${staff}`,
                UsuarioVotado: `${miembro}`,
                Razón: `${razón}`,
            }
        })
    }
}