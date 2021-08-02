module.exports = {
  name: "addtodo",
  description: "Adds a task to your todo list",
  async execute(interaction) {
    await interaction.reply("Added to your todo list. ");
  },
};
