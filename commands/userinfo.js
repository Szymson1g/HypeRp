const Discord = require("discord.js");
const moment = require('moment');
const fs = require('fs') 

module.exports.run = async (bot, message, args) => {

  let user = message.mentions.users.first() || message.author;
  const joinDiscord = moment(user.createdAt).format('llll');
  const joinServer = moment(user.joinedAt).format('llll');
  
  let roles = ""
  let rolesCount = 0;
  user.lastMessage.member.roles.forEach((r) => {
    let id = r.id+""
    if (!((r.name).toLocaleLowerCase().includes("everyone"))){
      roles += "<@&"+id+">, "
      rolesCount++;
    }
  })
  if (roles.length > 0){
    roles = roles.substr(0, roles.length-2);
  }
  
  let embed = new Discord.RichEmbed()
  embed.setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
  embed.setDescription(`${user}`)
  embed.setColor("RANDOM")
  embed.setThumbnail(`${user.displayAvatarURL}`)
  embed.addField('❯ Status', `${user.presence.status}`, true)
  embed.addField('❯ Utworzone konto', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
  embed.addField('❯ Bot', `${user.bot}`, true)
  embed.addField('❯ Aktualnie grasz w:', `${user.presence.game ? user.presence.game.name : 'Aktualnie nie gra w zadna gre'}`, true)
  embed.addField('❯ Dolaczyles na serwer', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
  embed.addField('❯ Role na serwerze ('+rolesCount+")", roles, true)
  embed.addField('❯ ID', `${user.id}`)
  embed.setFooter(`RozBot | Stworzony przez Rozrubka123!`, bot.user.displayAvatarURL)
  
  embed.setTimestamp();
  message.channel.send({ embed: embed });
  return;
}

module.exports.help = {
  name: 'user'
}

function getBetterStatus(bot, status){
  return emoji(bot, status)
}

function emoji (bot, name) {
  return bot.emojis.find(emoji => emoji.name === name)
}
function getTimeSpanFromDate(then){
  var now = new Date();
  var time = (now.getTime()/1000)-then.getTime()/1000
  var text = "";
		var tygodnie = 0;
		var dni = 0;
		var godziny = 0;
		var minuty = 0;
		time = Math.round(time * 10.0) /10.0;
		while (time >= 604800) {
			time = time - 604800;
			tygodnie++;
		}
		while (time >= 86400) {
			time = time - 86400;
			dni++;
		}
		while (time >= 3600) {
			time = time - 3600;
			godziny++;
		}
		while (time >= 60) {
			time = time - 60;
			minuty++;
		}
		fixed = 0
		if (tygodnie > 0) {
			text = tygodnie + "tyg " + dni + "d " + godziny + "g " + minuty + "m " +  time.toFixed(fixed) + "s";
		} else if (dni > 0) {
			text = dni + "d " + godziny + "g " + minuty + "m " +  time.toFixed(fixed) + "s";
		} else if (godziny > 0) {
			text = godziny + "g " + minuty + "m " + time.toFixed(fixed) + "s";
		} else if (minuty > 0) {
			text = minuty + "m " + time.toFixed(fixed) + "s";
		} else {
			text = time.toFixed(fixed) + "s";
		}
  return text;
}