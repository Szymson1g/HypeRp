const Discord = require("discord.js");

exports.run = (bot, msg, args) => {
    msg.channel.send(`${msg.author} To jest twoje ID: **${msg.author.id}**`)
};

module.exports.help = {
    name: "id"
}
