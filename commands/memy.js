const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch')

module.exports.run = async (bot, message, args) => {

    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals",
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(url =>{
        snekfetch.get(url).then(async res => {
            await message.channel.send({
                files: [{
                    attachment: res.body,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
        }).catch(err => console.error(err));
    }).catch(err => console.error(err));

};

module.exports.help = {
    name: 'memy',
    aliases: ['meme']
}