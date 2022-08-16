require('dotenv').config();
TOKEN = process.env.TOKEN;
OWNER_ID = process.env.OWNER_ID;

const { Console } = require('console');
const Discord = require("discord.js");
const { Client, IntentsBitField } = require('discord.js');

const client = new Discord.Client(
  {intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages, 
    IntentsBitField.Flags.MessageContent
  ]});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("messageCreate", msg => {
  console.log("recieved: '" + msg.content + "'; Author: " + msg.author);

  if (msg.author.bot) return;

  switch (msg.content)
  {
    case "restart":
      {
        console.log(OWNER_ID);
        if (msg.author == OWNER_ID)
        {
          msg.reply("NO");
        }
      }
  }

  if (msg.content === "ping") {
    msg.reply("ping");
  }
})
client.login(TOKEN);