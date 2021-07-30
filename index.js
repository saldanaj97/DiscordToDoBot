// Variables for discord.js
const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

// Variables for express
const express = require("express");
const app = express();
const port = 3000;

// Variables for mongoDB
const mongoose = require("mongoose");
const db = mongoose.connection;

// Main MongoDB Functions
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

const discordTodo = mongoose.model("Todo", todoSchema);

const todo = new discordTodo({ userID: "1234", task: "Test Task" });
/* todo.save((err, discordTodo) => {
  if (err) return console.error(err);
  else console.log("Successfully added new task.");
}); */

// Main Express Functions
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Main discord Functions
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  console.log(msg.author);
  const command = msg.content.split(" ", 1);
  const message = msg.content.split(command).splice(-1, 1);
  const task = message[0].trim();
  if (!msg.author.bot) {
    console.log("command:", command);
    console.log("message:", task);
    switch (command[0]) {
      case "!addtodo":
        msg.author.send(
          "'" + task + "'" + " has been added to your todo list. "
        );
        break;
    }
  }
});

client.login(process.env.CLIENT_TOKEN);
