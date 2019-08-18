const Discord = require('discord.js');

exports.run = async function(client, message, args) {

  //const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission('MUTE_MEMBERS')) return errors.noPerms(message, 'MUTE_MEMBERS');
  require('events').EventEmitter.prototype._maxListeners = 100;

  message.delete(10);
  if (!args[0]) {
      return message.channel.send('Uzycie : ` $mute @wzmianka komentarz`');
  
  }
  const mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!mUser) return errors.cantfindUser(message.channel);
  if (mUser.id === client.user.id) return errors.botuser(message);
  const mReason = args.join(' ').substring(22);
  if (!mReason) return errors.noReason(message.channel);
  if (mUser.hasPermission('MANAGE_MESSAGES')) return errors.equalPerms(message, mUser, 'MANAGE_MESSAGES');

  const muteEmbed = new Discord.RichEmbed()
    .setColor('#bc0000')
    .setDescription("~Mute~")
    .addField("❯ Osoba wyciszona", `${mUser}  ID ${mUser.id}`)
    .addField("❯ Wyciszona przez", `<@${message.author.id}> ID ${message.author.id}`)
    .addField("❯ kanal", message.channel)
    .addField("❯ Czas", message.createdAt)
    .addField("❯ Komentarz", mReason)
    .setTimestamp();

    let incidentchannel = message.guild.channels.find(`name`, "mute");
  if (!incidentchannel) return;

  message.guild.member(mUser).mute(mReason);
  incidentchannel.send(muteEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'mute',
  category: 'Moderation',
  description: 'MUTE HAMMER',
  usage: 'mute [name] [reason/optional]'
};
