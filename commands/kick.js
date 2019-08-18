const Discord = require('discord.js');

exports.run = async function(client, message, args) {

  //const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission('KICK_MEMBERS')) return errors.noPerms(message, 'KICK_MEMBERS');
  require('events').EventEmitter.prototype._maxListeners = 100;

  message.delete(10);
  if (!args[0]) {
      return message.channel.send('Uzycie : ` $kick @wzmianka komentarz`');
  
  }
  const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return errors.cantfindUser(message.channel);
  if (kUser.id === client.user.id) return errors.botuser(message);
  const kReason = args.join(' ').substring(22);
  if (!kReason) return errors.noReason(message.channel);
  if (kUser.hasPermission('MANAGE_MESSAGES')) return errors.equalPerms(message, kUser, 'MANAGE_MESSAGES');

  const kickEmbed = new Discord.RichEmbed()
    .setColor('#bc0000')
    .setDescription("~Kick~")
    .addField("❯ Osoba wyrzucona", `${kUser}  ID ${kUser.id}`)
    .addField("❯ Wyrzucona przez", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("❯ kanal", message.channel)
    .addField("❯ Czas", message.createdAt)
    .addField("❯ Komentarz", kReason)
    .setTimestamp();

    let incidentchannel = message.guild.channels.find(`name`, "kick");
  if (!incidentchannel) return;

  message.guild.member(kUser).kick(kReason);
  incidentchannel.send(kickEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'kick',
  category: 'Moderation',
  description: 'KICK HAMMER',
  usage: 'kick [name] [reason/optional]'
};
