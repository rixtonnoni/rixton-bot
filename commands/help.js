const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'help',
    run : async(client, message, args) => {
        const content = args.join(" ")
        const embed = new MessageEmbed()
        .setDescription(`
        **General**
        r/ping
        r/stats
        r/uptime
        
        **Basic**
        r/afk
        r/say
        r/avatar
        r/servericon`)
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        message.channel.send(embed)                
    }
}