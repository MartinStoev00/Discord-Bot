module.exports = async (args, message, pinging) => {
  try {
    pinging = true;
    const electedPerson = args[0].replace(/\D/g, "");
    const member = message.guild.members.cache.get(electedPerson);
    if (member) {
      const times = args[1];
      for (let i = times; i--; ) {
        if (await pinging) {
          setTimeout(() => {
            message.channel.send(`Come now ${member}`);
          }, 300);
        }
      }
      pinging = false;
    }
  } catch (err) {
    console.log(err);
  }
};
