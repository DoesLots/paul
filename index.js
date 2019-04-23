const botconfig = require("./botconfig.json")
const Discord = require("discord.js")

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("with JavaScript")
})

bot.on("message", async message => {
    if(message.author.bot) return
    if(message.channel.type === "dm") return
    
    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if(cmd === `${prefix}kick`){
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
        
        let incidentchannel = message.guild.channels.find(`name`, "incidents")
        if(!incidentchannel) return message.channel.send("Can't find incidents channel.")

        message.guild.member(kUser).kick(kReason)
        incidentchannel.send(kickEmbed)

        return
    }
    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!bUser) return message.channel.send("Can't find user")
        let bReason = args.join(" ").slice(22)
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission bud. Nice try.")
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can not be banned")

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser}with ID ${bUser.id}`)
        .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason)
        
        let incidentchannel = message.guild.channels.find(`name`, "incidents")
        if(!incidentchannel) return message.channel.send("Can't find incidents channel.")

        message.guild.member(bUser).ban(bReason)
        incidentchannel.send(banEmbed)

        return
    }





    if(cmd === `${prefix}report`) {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!rUser) return message.channel.send("Couldn't find user")
        let reason = args.join(" ").slice(22)
        if(!reason) return message.channel.send("Please give a reason for the report")
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#00ff1a")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel",message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason)

        let reportschannel = message.guild.channels.find(`name`, "reports")
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.")

        message.delete().catch(O_o=>{})
        reportschannel.send(reportEmbed)

        return message.channel.send(reportEmbed)
    }


    if(cmd === `${prefix}botinfo`){
        let bicon = bot.user.displayAvatarURL
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot information")
        .setColor("#00ff1a")
        .setThumbnail(bicon)
        .addField("Created On", bot.user.createdAt)
        .addField("Bot Name", bot.user.username)
        return message.channel.send(botembed)
    }
    if(cmd === `${prefix}serverinfo`){
        let sicon = message.guild.iconURL
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#00ff1a")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount)

        return message.channel.send(serverembed)
    }
    if(cmd === `${prefix}help`) {
        let bicon = bot.user.displayAvatarURL
        let helpembed = new Discord.RichEmbed()
        .setDescription("General Commands")
        .setColor("#00ff1a")
        .setThumbnail(bicon)
        .addField("$help", "Bring up this message.")
        .addField("$botinfo", "Gets information about the bot")
        .addField("$serverinfo", "Gets information about the server.")
        .addField("$report [@user] [reason]", "reports the user")
        
        return message.channel.send(helpembed)
    }
})

bot.login(botconfig.token);