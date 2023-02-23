const {
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ayuda")
      .setDescription("Te devuelve una lista con los comandos del bot."),
    async execute(interaction) {

      if(!interaction.member.roles.cache.has("979315821518159893")) return interaction.reply({ content: "No tienes suficientes permisos.", ephemeral: true })

      const emojis = {
        bot: "1074133200877650020",
        nekotina: "1074137675835129956",
        utilidad: "1074137802620551321",
        votaciones: "1074137958061449226",
      };
  
      const directories = [
        ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
      ];
  
      const formatString = (str) =>
        `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
  
      const categories = directories.map((dir) => {
        const getCommands = interaction.client.commands
          .filter((cmd) => cmd.folder === dir)
          .map((cmd) => {
            return {
              name: cmd.data.name,
              description:
                cmd.data.description ||
                "There is no description for this command.",
            };
          });
  
        return {
          directory: formatString(dir),
          commands: getCommands,
        };
      });
  
      const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shui Utilidades', iconURL: 'https://media.discordapp.net/attachments/979331923547652126/1074122242247630869/Logo_parte_1.png?width=238&height=234url', url: 'https://discord.gg/pokemon-kingdom' })
        .setTitle("<a:Okay:1074133200877650020> Lista de Comandos de Shui Utilities")
        .setDescription("<a:Estrellas4:1074117320865230919> **〉Información**\n> <a:Estrellas5:1074117495079833703> **Shui Utilities** solo tiene uso para miembros del staff de Pokémon Kingdom con varias funcionalidad para mejor uso y manejo de sistemas normalmente usados en el servidor.\n\n***`- Cualquier tipo de filtración del uso de este sistema puede acabar en expulsión del Staff.`***")
        .setColor("#fcb56d")
        .setFooter({ text: `Desarrollado por Developers de Pokémon Kingdom` });
      const components = (state) => [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("help-menu")
            .setPlaceholder("Porfavor escoje una categoría de comandos")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Comandos del directorio ${cmd.directory}.`,
                  emoji: emojis[cmd.directory.toLowerCase() || null],
                };
              })
            )
        ),
      ];
  
      const initialMessage = await interaction.reply({
        embeds: [embed],
        components: components(false),
      });
  
      const filter = (interaction) =>
        interaction.user.id === interaction.member.id;
  
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.SelectMenu,
      });
  
      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );
  
        const categoryEmbed = new EmbedBuilder()
          .setColor('#fcb56d')
          .setTitle(`${formatString(directory)} comandos`)
          .setDescription(
            `Lista de comandos del directorio ${directory}`
          )
          .addFields(
            category.commands.map((cmd) => {
              return {
                name: `\`${cmd.name}\``,
                value: cmd.description,
                inline: true,
              };
            })
          );
  
        interaction.update({ embeds: [categoryEmbed] });
      });
  
      collector.on("end", () => {
        initialMessage.edit({ components: components(true) });
      });
    },
  };