const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Niestety nie posiadasz do tego permisi!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie znaleziono takiego uzytkownika!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Podaj role jaka ma byc nadana dla uzytkownika!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie znaleziono takiej roli.");

  if(rMember.roles.has(gRole.id)) return message.reply("Uzytkownik juz ma taka role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Gratuluje, nadales uzytkownikowi role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Gratulacje <@${rMember.id}>, administrator serwera nadal ci role ${gRole.name}.`)
  }
}

module.exports.help = {
  name: "dajrole"
}