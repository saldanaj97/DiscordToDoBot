module.exports = {
  name: "addtodo",
  description: "Adds a task to your todo list",

  options: [
    {
      name: "input",
      type: 3,
      description: "Task to add to todo list",
      required: true,
    },
  ],
  async execute(interaction, client, discordTodo) {
    const newTask = new discordTodo({
      userID: interaction.member.user.id,
      task: interaction.data.options[0].value,
    });

    newTask.save((err, discordTodo) => {
      if (err) return console.error(err);
      console.log(discordTodo.task + " has been added to database. ");
    });

    // Respond to the user on discord
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content:
            "'" +
            interaction.data.options[0].value +
            "'" +
            " has been added to your todo list.",
          flags: 64,
        },
      },
    });
  },
};
