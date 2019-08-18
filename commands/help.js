const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    const gita = bot.emojis.find(emoji => emoji.name === "git");
 
 
   
    let xyazEmbed = new Discord.RichEmbed()
    .setAuthor(`INFORMACJE ZOSTALY WYSLANE`)
    .setColor("RANDOM")
    .setDescription(`<@`+message.author.id+`> komenda Zostala wyslana na prywatna wiadomosc, jesli wiadomosc nie dotarla to znaczy ze masz zablokowane prywatne wiadomosci.`);
 
 
    message.channel.send(xyazEmbed);
 
 
 
   
    let suxps = new Discord.RichEmbed()
    .setDescription(`📜 INFORMACJE O BOCIE 📜
 
    📃|**Nazwa Bota** ${bot.user.username} 📃
 
    📖|**Serwery na ktorych jestem** \n${bot.guilds.size}\n 📖
    🔧|**Perfix bota** \n!\n 🔧
 
    📆|**Data utworzenia** ${bot.user.createdAt} 📆
 
    👮‍|**STAFF** 👮‍
 
    👑|**Wlasciciel Bota** <@500401738591895552> 👑
 
    ID: ||500401738591895552||`)
    .setColor("RANDOM")
 
    let suxpaas = new Discord.RichEmbed()
    .setDescription(`📜 INFORMACJE O BOCIE 📜
 
    📃|**Nazwa Bota** ${bot.user.username} 📃
 
    📖|**Serwery na ktorych jestem** \n${bot.guilds.size}\n 📖
    🔧|**Perfix bota** \n!\n 🔧
 
    📆|**Data utworzenia** ${bot.user.createdAt} 📆
 
    👮‍|**STAFF** 👮‍
 
    👑|**Wlasciciel Bota** <@500401738591895552> 👑
 
    ID: ||500401738591895552|||`)
    .setColor("RANDOM")
 
    let hej = new Discord.RichEmbed()
    .setDescription(` __**=-┃ Komendy dla wszystkich ┃-=**__
    **!avatar - pokazuje twój avatar**
    **!memy - jakies memy :D**
    **!ascii - inne pismo**
    **!yt - kanał właściciela bota**
    **!id - pokazuje twoje id discorda**
    **!nsfw - emm no... xD**
    **!lolstat - statystyki w grze league of legends!**
    
    `)
    .setColor("RANDOM")
    .setFooter(`© RozBot | Stworzony przez Rozrubka123!`, bot.user.displayAvatarURL);
 
    message.author.send(hej);
 
    let xy1 = new Discord.RichEmbed()
.setDescription(` __**=-┃ Komendy Dla Moderacji ┃-=**__
 
 
**!ban @wzmianka powod** - Bot musi miec kanal o nazwie ban i trzeba nadac mu uprawnienia banowania.
**!kick @wzmiana powod** - Bot musi miec kanal o nazwie kick  i trzeba nadac mu uprawnienia kickowania.
**!warn @wzmianka powod** - Bot musi miec kanal o nazwie warny i trzeba nadac mu uprawnienia warnowania [ 3 warny = ban ]
**!dajrole @wzmianka rola** - nadaje wyznaczona role
**!usunrole @wzmianka rola** - usuwa wyznaczona role
**!clear 10** - wyczyszcza chat
**!glosowanie temat** - glosowanie tak czy nie
**!say** - pisanie za pomoca bota
 
`)
.setColor("RANDOM")
.setFooter(`© RozBot | Stworzony przez Rozrubka123!`, bot.user.displayAvatarURL);
 
message.author.send(xy1);
 
    try{
        await message.author.send(suxps);
        message.react('✅');
    }catch(e){
       
    }
 
}
 
 
 
module.exports.help = {
name: "help"
}
