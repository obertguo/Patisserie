const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');

exports.run = (message) =>{
    const duration = moment.duration(message.client.uptime , 'milliseconds');
    const uptime = `${duration.hours()}H ${duration.minutes()}M ${duration.seconds()}S`;

    const botInfoEmbed = new Discord.RichEmbed()
    .setDescription('[View Souce Code on Github](https://github.com/obertguo/Patisserie)')
    .addField('Guilds' , `${message.client.guilds.size}` , true)
    .addField('Channels' , `${message.client.channels.size}` , true)
    .addField('Users' , `${message.client.users.size}` , true)
    .addField('Bot Uptime' , `${uptime}` , true)
    .addField('Host Uptime' ,`${Math.round(100 * (os.uptime / 86400) / 100)} Days` , true)
    .addField('Memory' ,  `${Math.round(100 * (os.freemem / 1000000000) / 100)}GBs / ${Math.round(100 * (os.totalmem / 1000000000) / 100)}GBs` , true)
    .addField('Operating System' , `${os.type} ${os.release} ${os.arch}` , true) 
    .setColor('#36393E');
        
    message.channel.send({embed : botInfoEmbed});
}

exports.info = {
    description: 'Boring bot stuff 🤖'
}