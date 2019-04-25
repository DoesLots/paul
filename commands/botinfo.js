const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot information")
    .setColor("#00ff1a")
    .setThumbnail(bicon)
    .addField("Created On", bot.user.createdAt)
    .addField("Bot Name", bot.user.username)
    .addField("Running on", `${bot.guilds.size} Servers`)
    return message.channel.send(botembed)

}

module.exports.help = {
    name: "botinfo"
}