const Discord = require("discord.js")
const fs = require("fs")
const ms = require("ms")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"))

module.exports.run = async (bot, message, args) => {
    //$warn @user <reason>
    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("you don't have the permissions to warn them.")
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser) return message.reply("couldn't find user.")
    if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("you can't mute them because they have moderator permissions.")
    let reason = args.join(" ").slice(22)
    if(!reason) return message.reply("you need a reason")
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    }

    warns[wUser.id].warns++

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
        })

    let warnEmbed = new Discord.RichEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#fc6400")
        .addField("Warned User", `<@${wUser.id}>`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", warns[wUser.id].warns)
        .addField("Reason", reason)

    let warnchannel = message.guild.channels.find(channel => channel.name === "incidents")
    if (!warnchannel) return message.reply("couldn't find incidents channel")

    warnchannel.send(warnEmbed)

    if (warns[wUser.id].warns == 2) {
        let muterole = message.guild.roles.find(role => role.name === "muted")
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions: []
                })

            } catch (e) {
                console.log(e.stack)
            }
        }
        if(wUser.roles.has("muted")) return message.reply("you can't mute them because they are already muted")
        let mutetime = "2h"
        await(wUser.addRole(muterole.id))
        message.channel.send(`<@${wUser.id}> has been temporarily muted.`)

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.reply(`<@${wUser.id}> has been unmuted.`)
        }, ms(mutetime))
    }
    if (warns[wUser.id].warns == 3) {
        let bantime = "1d"
        let tempbanrole = message.guild.roles.find(role => role.name === "tempban")
        if(!tempbanrole) {
            try {
                tempbanrole = await message.guild.createRole({
                    name: "tempban",
                    color: "#000000",
                    permissions: []
                })
            } catch(e) {
                console.log(e.stack)
            }
        }
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(tempbanrole, {
                VIEW_CHANNEL: false
            })
        })
        message.guild.member(wUser).addRole(tempbanrole.id)
        message.channel.send(`<@${wUser.id}> has been tempbanned.`)

        setTimeout(function(){
            wUser.removerole(tempbanrole.id)
            message.reply(`<@${wUser.id} has been unbanned.`)
        }, ms(bantime))
    }
}

module.exports.help = {
    name: "warn"
}