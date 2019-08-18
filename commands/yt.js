const Discord = require('discord.js');


module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`${module.exports.help.name} Command Information`)
      .setDescription(`${module.exports.help.description}`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
      .setColor("RANDOM")
    message.channel.send(embed);
    return
  };

  message.channel.createInvite()
    .then((invite) => {
      let embed = new Discord.RichEmbed()
        .setTitle('`Kanal wlasciciela bota:` **http://www.youtube.com/channel/UCoFzouw_98pSKoLMyd3dYTg**')
        .setColor("RANDOM")
      message.channel.send(embed);

    });
};

module.exports.help = {
  name: 'yt',
  description: 'Links for youtuber channel owner.',
  usage: 'yt'
};
