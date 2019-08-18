const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Nie znaleziono uzytkownika.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie posiadasz permisji do tej komendy!");
  let muterole = message.guild.roles.find(`name`, "mute");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "mute",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("Podaj czas!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> zostal wyciszony tymczasowo na ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> zostal odciszony!`);
  }, ms(mutetime));

}

module.exports.help = {
  name: "tempmute"
}