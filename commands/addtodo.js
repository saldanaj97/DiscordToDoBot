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
  async execute(interaction, client) {
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
