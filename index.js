const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  const command = msg.content.split(" ", 1);
  const message = msg.content.split(command).splice(-1, 1);
  const task = message[0].trim();
  if (!msg.author.bot) {
    console.log("command:", command);
    console.log("message:", task);
    switch (command[0]) {
      case "!addtodo":
        msg.reply("'" + task + "'" + " has been added to your todo list. ");
        break;
    }
  }
});

client.login(process.env.CLIENT_TOKEN);
