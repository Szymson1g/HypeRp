const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Nie posiadasz do tego permisi!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Nie odnaleziono uzytkownika!");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Za szybko uzywasz komendy!");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("~~Warn~~")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Ostrzezony uzytkownik", `<@${wUser.id}>`)
  .addField("Ostrzezony przez", message.channel)
  .addField("Liczba ostrzezen", warns[wUser.id].warns)
  .addField("Powod", reason);

  let warnchannel = message.guild.channels.find(`name`, "warny");
  if(!warnchannel) return message.reply("Nie odnaleziono kanalu!");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "WYCISZONY");
    if(!muterole) return message.reply("Nie odnaleziono roli WYCISZONY!");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> zostal tymczasowo wyciszony.`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> zostal odciszony.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> zostal zbanowany.`)
  }

}

module.exports.help = {
  name: "warn"
}