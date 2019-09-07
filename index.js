const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
require('./events/eventLoader')(client);

client.commands = new Discord.Collection();
client.prefix = prefix;

fs.readdirSync('./cmds').filter(file => file.endsWith('.js')).forEach(file =>{
    client.commands.set(file.split('.js')[0], {
        exec: require(`./cmds/${file}`),
        info: {
            desc: require(`./cmds/${file}`).info.description,
            name: file.split('.js')[0]
        }
    });
});

client.login(token);