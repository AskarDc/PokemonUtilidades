const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
  } = require("discord.js");
  
  const { loadEvents } = require("./Handlers/cargarEventos");
  const { loadCommands } = require("./Handlers/cargarComandos");

  const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
  });

  client.snipes = new Map()
  client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
  })
  client.commands = new Collection();
  client.config = require("./config.json");
  
  client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
  });
  
  module.exports = client;