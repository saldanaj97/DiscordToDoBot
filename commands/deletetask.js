module.exports = {
  name: "deletetask",
  description: "Deletes a task from your todo list. ",
  async execute(interaction, client) {
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
