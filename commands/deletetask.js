const data = {
  name: "deletetask",
  description: "Deletes a task from your todo list. ",
  options: [
    {
      name: "input",
      type: 3,
      description: "Task to delete from your todo list. ",
      required: true,
    },
  ],
  async execute(interaction, client, discordTodo) {
    const memberID = interaction.member.user.id;

    discordTodo.deleteOne(
      {
        userID: memberID,
        task: interaction.data.options[0].value,
      },
      (err) => {
        if (!err) {
          console.log("Task removed");
        } else {
          console.log("error");
        }
      }
    );

    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Deleted from your todo list. ",
          flags: 64,
        },
      },
    });
  },
};

module.exports = data;
