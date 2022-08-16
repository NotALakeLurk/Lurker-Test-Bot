const { SlashCommandBuilder } = require("discord.js");
const { exit } = require("process");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stops the bot locally"),
  async execute(interaction)
  {
    await interaction.reply("Stopping......");
    exit();
  }
};