module.exports = {
  name: "edittask",
  description: "Edits a task from your todo list. ",
  async execute(interaction, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Task has been edited. ",
          flags: 64,
        },
      },
    });
  },
};
