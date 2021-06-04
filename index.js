const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE']
});

client.on('message', async message => {
    if(message.content === "indonesia") message.reply(":flag_id:")

//COMMAND BOT DI SERVER.JS
const prefix = "r/"
if(!message.content.startsWith(prefix)) return null;
let msg = message.content.toLowerCase();
let args = message.content.slice(prefix.length).trim().split(" ");
let cmd = args.shift().toLowerCase();

  
let commandFiles;
try{
  commandFiles = require(`./commands/${cmd}.js`)
} catch (err) {
  return message.reply("Command Not Found")
}
const db = require("quick.db")
const now = Date.now()
if(db.has(`cd_${message.author.id}`)) {
  const expirationTime = db.get(`cd_${message.author.id}`) + 3000
  if(now < expirationTime) {
  const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd}\` command.`);
  }
}
  db.set(`cd_${message.author.id}`, now);
  setTimeout(() => {
    db.delete(`cd_${message.author.id}`)
  },3000)
try {
  commandFiles.run(client, message, args)
} catch (err) {
  } finally {
    console.log(`${message.author.tag} menggunakan command ${prefix}${cmd}`)
  }
  
})
//variable welcome and leave card
const canvacord = require("canvacord");

//welcomeCard
client.on("guildMemberAdd", async member => {
  if(member.guild.id !== "849362094474133514") return;
  const welcomeCard = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#ff0000")
  .setColor("username-box", "#ff0000")
  .setColor("discriminator-box", "#ff0000")
  .setColor("message-box", "#ff0000")
  .setColor("border", "#ff0000")
  .setColor("avatar", "#ff0000")
  .setBackground("https://i.pinimg.com/originals/36/a8/b4/36a8b4cad9fd31c70586f13d5dfc6acb.jpg")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png")
  member.guild.channels.cache.get("850014348264472586").send(member.user.toString(), attachment)
})

//LeaveCard
client.on("guildMemberRemove", async member => {
    if(member.guild.id !== "849362094474133514") return;
    const welcomeCard = new canvacord.Leaver()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setAvatar(member.user.displayAvatarURL({format: "png"}))
    .setColor("title", "#ff0000")
    .setColor("username-box", "#ff0000")
    .setColor("discriminator-box", "#ff0000")
    .setColor("message-box", "#ff0000")
    .setColor("border", "#ff0000")
    .setColor("avatar", "#ff0000")
    .setBackground("https://i.pinimg.com/originals/36/a8/b4/36a8b4cad9fd31c70586f13d5dfc6acb.jpg")
    .setMemberCount(member.guild.memberCount)
    let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "bye.png")
    member.guild.channels.cache.get("850014430054187058").send(member.user.toString(), attachment)
})

//Variable Invite Trackr
const guildInvites = new Map();
require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});

client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
            .setDescription(`${member.user.tag} Telah mengundang ${member.guild.memberCount} orang.\nDi undang oleh ${usedInvite.inviter.tag}\nOrang yang telah menggunakan link ini: ${usedInvite.uses}`)
            .setTimestamp()
            .setTitle(`${usedInvite.url}`);
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '850221387984797736');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});


client.login('TOKEN');
client.on('ready', async () => {
    console.log(`${client.user.tag} sudah online!`)
    client.user.setActivity("r/help")//bisa diganti sesuai keinginan
})
