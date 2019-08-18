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
        .setTitle('Prace na Naszym Serwerze: **Złomiarz, Piekarz, Sadownik, Winiarz, Kurier, Taxi, Reporter**')
        .setColor("RANDOM")
      message.channel.send(embed);

    });
};

module.exports.help = {
  name: 'prace',
  description: 'Jobs for server grand theft auto with fivem.',
  usage: 'prace'
};
