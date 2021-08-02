module.exports = {
  name: "finishedtask",
  description: "Marks a task as finished.",
  async execute(interaction, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Task has been completed.",
          flags: 64,
        },
      },
    });
  },
};
