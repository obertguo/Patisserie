const Discord = require('discord.js');

module.exports = (message) =>{

    if(message.content.length === 0 || message.author.bot) return;

    const blackListedCmds = ['sleep', 'gay', 'study', 'hug'];

    for(cmd of blackListedCmds){if(message.content.startsWith(message.client.prefix + cmd)) return;}

    message.client.channels.find(chan => chan.id === '569695667988201492').send({embed: new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} deleted a message`, message.author.avatarURL)
    .setDescription(`\`${message.content}\` in ${message.channel}`)
    .setColor('#ff6961')
    .setTimestamp()
    });
    
}