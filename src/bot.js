try {
  require("dotenv").config();
  const { Client } = require("discord.js");
  const vote = require("./vote");
  const ping = require("./ping");
  const PREFIX = "$";
  let personVoted = [];
  const client = new Client();

  const naming = (id, message) => {
    console.log(message.guild.members.cache.get(id).nickname);
    return message.guild.members.cache.get(id).nickname;
  };

  const stringifing = (input, message) => {
    const res = input.map((person) => {
      person.whoIsVoted = naming(person.whoIsVoted, message);
      person.votedBy = person.votedBy.map((voter) => naming(voter, message));
    });
    return JSON.stringify(res, null, 2);
  };

  setInterval(() => {
    personVoted = [];
  }, 180000);

  client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      switch (CMD_NAME) {
        case "vote":
          vote(args, message, personVoted);
          break;
        case "ping":
          ping(args, message);
          break;
        case "stats":
          message.reply(`Stats are ${stringifing(personVoted, message)}`);
          break;
      }
    }
  });

  client.login(process.env.DISCORD_BOT);
} catch (err) {
  console.log(err);
}
