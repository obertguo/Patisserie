const Discord = require('discord.js');

exports.run = (message, client) =>{

    let helpEmbed = new Discord.RichEmbed()
         .setAuthor(message.client.user.tag, message.client.user.avatarURL)
         .setFooter(`The prefix is ${client.prefix}`)
         .setColor('#ffbdbd');

    const cmdName = client.commands.map(v => v.info.name);
    const cmdDesc = client.commands.map(v => v.info.desc);

    for(let i = 0; i < client.commands.size; i++){
        helpEmbed.addField(cmdName[i], cmdDesc[i]);
    }

    message.channel.send({embed: helpEmbed});
}

exports.info = {
    description: 'Help guide ❔'
}