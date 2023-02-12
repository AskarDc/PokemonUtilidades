function loadCommands(client) {
  const ascii = require("ascii-table");
  const fs = require("fs");
  const table = new ascii().setHeading("Comandos", "Estado");

  let commandsArray = [];

  const commandsFolder = fs.readdirSync("./comandos");
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./comandos/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../comandos/${folder}/${file}`);

      const properties = { folder, ...commandFile };
      client.commands.set(commandFile.data.name, properties);

      commandsArray.push(commandFile.data.toJSON());

      table.addRow(file, "cargado");
      continue;
    }
  }

  client.application.commands.set(commandsArray);

  return console.log(table.toString(), "\n Comandos cargados");
}

module.exports = { loadCommands };