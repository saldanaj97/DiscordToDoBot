const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "viewtodos",
  description: "View your todo list. ",
  async execute(interaction, client, discordTodo) {
    const memberID = interaction.member.user.id;
    const username = interaction.member.user.username;
    const todoList = await discordTodo.find({ userID: memberID }).exec();
    var todos = [];

    todoList.forEach((todo) => {
      let newTask = { name: "\u200B", value: "- \u200B " + todo.task };
      todos.push(newTask);
    });

    let todoListEmbed = new MessageEmbed()
      .setColor("#FF5733")
      .setTitle(username + "'s Todo List")
      .addFields({ name: "\u200B", value: "No tasks in your list. " });

    if (!todos.length == 0) {
      console.log("here");
      todoListEmbed = new MessageEmbed()
        .setColor("#FF5733")
        .setTitle(username + "'s Todo List")
        .addFields(todos);
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          embeds: [todoListEmbed],
          flags: 64,
        },
      },
    });
  },
};
