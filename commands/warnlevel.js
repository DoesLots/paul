const Discord = require("discord.js")
const fs = require("fs")
const ms = require("ms")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"))

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("only moderators are able to check warnings.")
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser) return message.reply("couldn't find user.")
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    }
    let warnlevel = warns[wUser.id].warns

    message.reply(`<@${wUser.id}> has ${warnlevel} warnings`)

}

module.exports.help = {
    name: "warnlevel"
}