module.exports = (args, message, ping) => {
  try {
    ping = true;
    const electedPerson = args[0].replace(/\D/g, "");
    const member = message.guild.members.cache.get(electedPerson);
    if (member) {
      const times = args[1];
      for (let i = times; i--; ) {
        if (ping) {
          setTimeout(() => {
            message.channel.send(`Come now ${member}`);
          }, 300);
        }
      }
      ping = false;
    }
  } catch (err) {
    console.log(err);
  }
};
