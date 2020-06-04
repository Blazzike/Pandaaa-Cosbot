module.exports = {
  name: 'Jake',
  message(msg) {
    if (msg.author.bot) {
      return;
    }

    if (msg.content.toLowerCase().includes('jake')) {
      const imageNumber = Math.floor(Math.random() * (23 - 1 + 1)) + 1;
      msg.channel.send({
        files: [`${__dirname}/jakes/Jake${imageNumber}.gif`]
      })
    }
  }
};
