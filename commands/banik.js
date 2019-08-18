const Discord = require('discord.js');

exports.run = async function(client, message, args) {

  //const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission('BAN_MEMBERS')) return errors.noPerms(message, 'BAN_MEMBERS');
  require('events').EventEmitter.prototype._maxListeners = 100;

  message.delete(10);
  if (!args[0]) {
      return message.channel.send('Uzycie : ` $ban @wzmianka komentarz`');
  
  }
  const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return errors.cantfindUser(message.channel);
  if (bUser.id === client.user.id) return errors.botuser(message);
  const bReason = args.join(' ').substring(22);
  if (!bReason) return errors.noReason(message.channel);
  if (bUser.hasPermission('MANAGE_MESSAGES')) return errors.equalPerms(message, bUser, 'MANAGE_MESSAGES');

  const banEmbed = new Discord.RichEmbed()
    .setColor('#bc0000')
    .setDescription("~Ban~")
    .addField("❯ Osoba zbanowana", `${bUser}  ID ${bUser.id}`)
    .addField("❯ Zbanowana przez", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("❯ kanal", message.channel)
    .addField("❯ Czas", message.createdAt)
    .addField("❯ Komentarz", bReason)
    .setTimestamp();

    let incidentchannel = message.guild.channels.find(`name`, "ban");
  if (!incidentchannel) return;

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'ban',
  category: 'Moderation',
  description: 'BAN HAMMER',
  usage: 'ban [name] [reason/optional]'
};
