const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let helpembed = new Discord.RichEmbed()
    .setDescription("General Commands")
    .setColor("#00ff1a")
    .setThumbnail(bicon)
    .addField("$help", "Bring up this message.")
    .addField("$botinfo", "Gets information about the bot", true)
    .addField("$serverinfo", "Gets information about the server.", true)
    .addField("$report [@user] [reason]", "reports the user")

}

module.exports.help = {
    name: "help"
}