const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let muterole = message.guild.roles.find(role => role.name === "muted")
    let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!tounmute) return message.reply("Couldn't find user.")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the permissions to unmute them.")
    if (tounmute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't unmute them because they have moderator permissions")
    if (!tounmute.roles.has(muterole.id)) return message.reply("they aren't muted.")

    await(tounmute.removeRole(muterole.id))
    let bicon = bot.user.displayAvatarURL
    let unmuteembed = new Discord.RichEmbed()
    .setDescription("User Unmuted")
    .setColor("#9f00ff")
    .setThumbnail(bicon)
    .addField("User Unmuted", `<@${tounmute.id}>`)
    .addField("Unmuted By", `${message.member}`)
    return message.channel.send(unmuteembed)
}

module.exports.help = {
    name: "unmute"
}