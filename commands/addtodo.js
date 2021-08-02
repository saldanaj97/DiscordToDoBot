module.exports = {
  name: "addtodo",
  description: "Adds a task to your todo list",
  async execute(interaction, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Added to your todo list",
          flags: 64,
        },
      },
    });
  },
};
