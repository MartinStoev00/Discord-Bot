module.exports = (args, message, personVoted) => {
  const votesNeeded = 3;
  if (args.length !== 1) return message.reply("Please do not frick me up");
  const electedPerson = args[0].replace(/\D/g, "");
  const member = message.guild.members.cache.get(electedPerson);
  if (member) {
    let isNotCurrentlyElected = personVoted
      .map((person) => person.whoIsVoted)
      .every((personIsVotedId) => personIsVotedId !== electedPerson);
    if (isNotCurrentlyElected) {
      personVoted.push({
        whoIsVoted: electedPerson,
        votedBy: [message.author.id],
      });
      message.reply(
        `With your vote, now we have ${member} at(1/${votesNeeded}). You have 3 minutes to vote!`
      );
    } else {
      personVoted.forEach((person) => {
        if (person.whoIsVoted === electedPerson) {
          let personHasNotVoted = person.votedBy.every(
            (peopleWhoHaveVoted) => peopleWhoHaveVoted !== message.author.id
          );
          if (personHasNotVoted) {
            person.votedBy.push(message.author.id);
            message.reply(
              `With your vote, now we have ${member} at(${person.votedBy.length}/${votesNeeded})`
            );
          } else {
            message.reply(`You have voted already!`);
          }
        }
      });
    }
    personVoted.forEach((person, i, self) => {
      if (person.votedBy.length === votesNeeded) {
        member.voice.kick();
        message.reply(`${member} has been kicked!`);
        person.votedBy = [];
      }
    });
  }
};
