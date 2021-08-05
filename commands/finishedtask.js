module.exports = {
  name: "finishtask",
  description: "Marks a task as completed in your todo list. ",
  options: [
    {
      name: "completedtask",
      type: 3,
      description: "The task you wish to mark as completed. ",
      required: true,
    },
  ],
  async execute(interaction, client, discordTodo) {
    const memberID = interaction.member.user.id;
    const taskToEdit = interaction.data.options[0].value;
    const editedTask = "~~ " + taskToEdit + "~~ ";
    const taskFound = await discordTodo
      .find({
        task: taskToEdit,
      })
      .exec();
    var editedConfirmation = "Sorry we could not find that task in your list. ";

    if (taskFound.length == 1) {
      discordTodo.updateOne(
        {
          userID: memberID,
          task: taskToEdit,
        },
        {
          task: editedTask,
        },
        (err) => {
          if (!err) {
            console.log("Task marked as completed");
          } else {
            console.log("error");
          }
        }
      );
      editedConfirmation = taskToEdit + " has been marked as completed. ";
    } else if (taskFound.length > 1) {
      discordTodo.updateMany(
        {
          userID: memberID,
          task: taskToEdit,
        },
        {
          task: editedTask,
        },
        (err) => {
          if (!err) {
            console.log("All matching tasks marked as completed. ");
          } else {
            console.log("error");
          }
        }
      );
      editedConfirmation =
        "You had multiple '" +
        taskToEdit +
        "' entries in your todo list so we marked them all as completed.  ";
    }
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: editedConfirmation,
          flags: 64,
        },
      },
    });
  },
};
