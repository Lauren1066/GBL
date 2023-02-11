const constantsFile = require("../../Storage/constants.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        console.log(`${interaction.commandName} was run by ${interaction.user.username}`);
        await command.execute(interaction, interaction.client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isButton() && interaction.customId == "verify") {
      const user = await interaction.guild.members.fetch(interaction.user.id);
      const role = await interaction.guild.roles.fetch("988875575638777919");
      await user.roles.add(role);
      interaction.reply({ content: "Verified!", ephemeral: true });
    }
  },
};
