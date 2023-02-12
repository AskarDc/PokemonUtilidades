const {Client} = require('discord.js');
const config = require("../../config.json");
const mongoose = require('mongoose')
const mongodbURL = process.env.MONGODBURL;

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {


        
        console.log(`Evento ready preparado! ${client.user.tag}`);

        //if (!mongodbURL) return;

        //await mongoose.connect(mongodbURL || '', {
            //keepAlive: true,
            //useNewUrlParser: true,
            //useUnifiedTopology: true
        //})

        //if (mongoose.connect) {
            //console.log("La base de datos está funcionando")
        //}

        const activities = [
            'siendo de utilidad',
            'dev team', 
            'en mantenimiento constante'
        ];

        setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)];
            client.user.setPresence({ activities: [{ name: `${status}`}]});
        }, 40000);
        
    },
};