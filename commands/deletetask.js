module.exports = {
  name: "deletetask",
  description: "Deletes a task from your todo list. ",
  options: [
    {
      name: "input",
      type: 3,
      description:
        "The task to delete from your todo list. (ex. Finish designs) ",
      required: true,
    },
  ],
  async execute(interaction, client, discordTodo) {
    const memberID = interaction.member.user.id;
    const taskToDelete = interaction.data.options[0].value;
    const taskFound = await discordTodo
      .find({
        task: taskToDelete,
      })
      .exec();
    var deletedMessage = "Sorry we could not find that task in your list. ";

    if (taskFound.length == 1) {
      discordTodo.deleteOne(
        {
          userID: memberID,
          task: taskToDelete,
        },
        (err) => {
          if (!err) {
            console.log("Task removed");
          } else {
            console.log("error");
          }
        }
      );
      deletedMessage = taskToDelete + " deleted from your todo list. ";
    } else if (taskFound.length > 1) {
      discordTodo.deleteOne(
        {
          userID: memberID,
          task: taskToDelete,
        },
        (err) => {
          if (!err) {
            console.log("Task removed");
          } else {
            console.log("error");
          }
        }
      );
      deletedMessage =
        "You had multiple '" +
        taskToDelete +
        "' entries in your todo list so we only removed the newest entry. ";
    }

    console.log(deletedMessage);

    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: deletedMessage,
          flags: 64,
        },
      },
    });
  },
};
