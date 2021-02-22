module.exports = (args, message) => {
  try {
    const electedPerson = args[0].replace(/\D/g, "");
    const member = message.guild.members.cache.get(electedPerson);
    if (member) {
      const times = args[1];
      for (let i = times; i--; ) {
        setTimeout(() => {
          message.reply(`Come now ${member}`);
        }, 300);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
