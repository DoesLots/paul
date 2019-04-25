const Discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
    //$tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    //start of creating role
    if (!tomute) return message.reply("Couldn't find user.")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the permissions to mute them.")
    //add can't mute them if they are already muted
    //add it here later
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them because they have moderator permissions")
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
    //end of creating role
    //start of updating channels
    message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        })
    })
    //set mute time and send message
    let mutetimeraw = args[1]
    let muteunit = mutetimeraw[mutetimeraw.length - 1]
    let mutetimebef = mutetimeraw.split(muteunit)
    let mutetime = mutetimebef[0]
    muteunit = muteunit.toLowerCase()
    switch (muteunit) {
        case "s":
        muteunit = "Second"
        break
        case "m":
        muteunit = "Minute"
        break
        case "h":
        muteunit = "Hour"
        break
        case "d":
        muteunit = "Day"
        break
        default:
        muteunit = "no value found"
    }
    if(mutetime > 1) {
        muteunit = muteunit + "s"
    }

    if (!mutetimeraw) return message.reply("You didn't specify a time!")

    await (tomute.addRole(muterole.id))
    let bicon = bot.user.displayAvatarURL
    let muteembed = new Discord.RichEmbed()
        .setDescription("TempMute")
        .setColor("#9f00ff")
        .setThumbnail(bicon)
        .addField("User Muted", `<@${tomute.id}>`)
        .addField("Muted By", `${message.member}`)
        .addField("Mute Time", `${mutetime} ${muteunit}`)
    message.channel.send(muteembed)
    setTimeout(function () {
        tomute.removeRole(muterole.id)
        let unmuteembed = new Discord.RichEmbed()
            .setDescription("UnMute")
            .setColor("#9f00ff")
            .setThumbnail(bicon)
            .addField("User UnMuted", `<@${tomute.id}>`)
        message.channel.send(unmuteembed)
    }, ms(mutetimeraw))


    //end of module
}

module.exports.help = {
    name: "tempmute"
}