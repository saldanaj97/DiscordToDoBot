// .env
require("dotenv").config();

/*--------------- MongoDB ---------------*/
const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb://localhost/discordTodos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Conncted");
});

const todoSchema = new mongoose.Schema({
  userID: String,
  task: String,
});

const discordTodo = mongoose.model("discordTodos", todoSchema);

/*--------------- Express ---------------*/
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

/*--------------- Discord ---------------*/
const Discord = require("discord.js");
const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const client = new Discord.Client();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

client.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

const commands = client.commands.map(({ execute, ...data }) => data);
const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.COMMAND_CLIENT_TOKEN,
        process.env.TEST_GUILD_TOKEN
      ),
      {
        body: commands,
      }
    );

    console.log("Sucessfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      await client.commands
        .get(command)
        .execute(interaction, client, discordTodo);
    } catch (error) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "There was an error with your request. " + error,
            flags: 64,
          },
        },
      });
    }
  });
});

client.login(process.env.CLIENT_TOKEN);
