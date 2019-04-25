const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!kUser) return message.channel.send("Can't find user")
    let kReason = args.join(" ").slice(22)
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission bud. Nice try.")
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can not be kicked")

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser}with ID ${kUser.id}`)
    .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason)
    
    let incidentchannel = message.guild.channels.find(channel => channel.name === "incidents")
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.")

    message.guild.member(kUser).kick(kReason)
    incidentchannel.send(kickEmbed)

    return
}

module.exports.help = {
    name: "kick"
}