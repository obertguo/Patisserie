const Discord = require('discord.js');
module.exports = {
    name: 'purge',
    description: "Purge messages",
    execute(message, args) {
        if(!args[0]) return message.channel.send('Input number of messages to delete.').then((sentMsg)=> {
            message.delete();
            sentMsg.delete(3000);
        });
        if(Number.isInteger(args[0]) || args < 1 || 99 < args) return message.channel.send('Args is not an integer or is out of bounds. (1-99)').then((sentMsg)=> {
            message.delete();
            sentMsg.delete(3000);
        });

        const numPurge = parseInt(args) + 1;
        message.channel.bulkDelete(numPurge);
    }
}