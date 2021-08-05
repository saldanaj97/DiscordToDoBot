module.exports = {
  name: "edittask",
  description: "Edits a task from your todo list. ",
  options: [
    {
      name: "old",
      type: 3,
      description: "The task to edit from your todo list. (ex. Finhs designs) ",
      required: true,
    },
    {
      name: "new",
      type: 3,
      description:
        "The edited task you want to have in your list. (ex. Finish designs)",
      required: true,
    },
  ],
  async execute(interaction, client, discordTodo) {
    const memberID = interaction.member.user.id;
    const taskToEdit = interaction.data.options[0].value;
    const editedTask = interaction.data.options[1].value;
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
            console.log("Task edited");
          } else {
            console.log("error");
          }
        }
      );
      editedConfirmation =
        taskToEdit + " has been edited to " + editedTask + " .";
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
            console.log("All tasks edited. ");
          } else {
            console.log("error");
          }
        }
      );
      editedConfirmation =
        "You had multiple '" +
        taskToEdit +
        "' entries in your todo list so we edited and updated them all.  ";
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
