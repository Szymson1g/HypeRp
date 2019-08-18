const Discord = require("discord.js")


exports.run = async (bot, message, args, tools) => {

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return errorUtils.sendNoPermissionError(bot, message.channel);
    if (!args[0])
      return errorUtils.sendCommandArgumentsError(
        bot,
        message.channel,
        this.help.usage
      );
    let msg = await message.channel
      .send(
        new Discord.RichEmbed()
          .setTitle(`Glosowanie`)
          .setDescription(args.join(" "))
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter(`${message.author.username}`, bot.user.displayAvatarURL)
      );
    await msg.react("👍");
    await msg.react("👎");
  };
  
  module.exports.help = {
    enabled: true,
    name: "glosowanie",
    description: "Bot tworzy glosowanie",
    usage: "glosowanie <temat>"
  };