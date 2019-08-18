Discord = require("discord.js");
 

module.exports.run = async (bot, message, args) => {

    var lista = []
    lista.push("500401738591895552") //rozrubka

    
  if(!args[0]) return message.channel.send("no");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Usunales ${args[0]} wiadomości.`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}