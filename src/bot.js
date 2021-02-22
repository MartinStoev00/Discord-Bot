require("dotenv").config();
const { Client } = require("discord.js");
const vote = require("./vote");
const ping = require("./ping");
const PREFIX = "$";
let personVoted = [];
const client = new Client();

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
      case "ping":
        ping(args, message);
    }
  }
});

client.login(process.env.DISCORD_BOT);
//a
