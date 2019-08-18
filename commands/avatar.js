module.exports.run = async (bot, msg, args) => {
    let request = await msg.channel.send("Generuje avatar...");
    let taggedUser = msg.mentions.users.first() || msg.author;

    await msg.channel.send({files: [
        {
            attachment: taggedUser.displayAvatarURL,
            name: "avatar.png"
        }
    ]});
    msg.delete();
}
module.exports.help = {
    name: "avatar"
}