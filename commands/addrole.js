const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("you don't have the permissions to do that.")
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!rMember) return message.reply("couldn't find user.")
    let rolearg = args.join(" ").slice(22)
    console.log(rolearg)

    if(!rolearg) return message.reply("specify a role!")
    let gRole = message.guild.roles.find(role => role.name === rolearg)
    console.log(gRole)
    if(!gRole) return message.reply("couldn't find that role")

    if(rMember.roles.has(gRole.id)) return message.reply("they already have that role.")
    await(rMember.addRole(gRole.id))

    try {
        await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
    }catch(e){
        message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM you, but but their DMs are locked.`)
    }

}

module.exports.help = {
    name: "addrole"
}