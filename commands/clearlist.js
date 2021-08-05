module.exports = {
  name: "clearlist",
  description: "Clears your todo list",
  async execute(interaction, client, discordTodo) {
    const memberID = interaction.member.user.id;
    await discordTodo.deleteMany({});
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Your todo list has been cleared. ",
          flags: 64,
        },
      },
    });
  },
};
