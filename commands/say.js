const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  var lista = []
  lista.push("500401738591895552") //rozrubka.
 
  if(!lista.includes(message.author.id)) return message.reply("Nie posiadasz permisji (BOT OWNER), mozliwy tez jest zakup tej komendy za jedynie 10 PSC/PAYPAL u właściciela bota")
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
}

module.exports.help = {
  name: "say"
}