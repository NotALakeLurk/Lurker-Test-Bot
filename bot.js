require('dotenv').config();
const TOKEN = process.env.TOKEN;
const OWNER_ID = process.env.OWNER_ID;

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, IntentsBitField } = require('discord.js');
const { exit } = require('process');
const { execFile, exec } = require('node:child_process');

exec("node deploy-commands.js");

const client = new Client(
  {intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages, 
    IntentsBitField.Flags.MessageContent
  ]});

  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

  for (const file of commandFiles)
  {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on("messageCreate", msg => {
  if (msg.author.bot) return;
  
  console.log("recieved: '" + msg.content + "'; Author: " + msg.author);
  
  switch (msg.content)
  {
    case "stop":
      {
        if (msg.author == OWNER_ID)
        {
          console.log('SHUTTING DOWN.....');
          process.exit();
        }
      }
      break;
  }

  if (msg.content === "ping")
  {
    msg.reply("ping");
  }
})
client.login(TOKEN);