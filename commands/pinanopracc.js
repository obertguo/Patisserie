const Discord = require('discord.js');
const set = new Set();
const map = new Map();

module.exports = {
    name: 'pinanopracc',
    description: 'Keep track of time spent practicing in pinano.',
    execute(message, args) {
        

        let praccEmbed = new Discord.RichEmbed();

        const user = message.author;
        const startPracc = parseInt(Date.now());

        //Finish pracc
        if(set.has(message.author.id)){

            const timePraccHours = Math.round((parseInt(Date.now()) - map.get(message.author.id)) / (1000 * 3600));
            const timePraccMinutes = Math.round((parseInt(Date.now()) - map.get(message.author.id)) / 60000);
            const timePraccSeconds = Math.round((parseInt(Date.now()) - map.get(message.author.id)) / 1000) % 60;

            praccEmbed.color = 0xff6961;
            praccEmbed.author = {name:`${user.tag} finished practicing!`, icon_url: user.avatarURL};
            praccEmbed.description = `You practiced for **${timePraccHours}H ${timePraccMinutes}M ${timePraccSeconds}S**`;
            praccEmbed.timestamp = Date.now();
            
            message.channel.send({embed : praccEmbed}).then(message.delete());
            set.delete(message.author.id);
            map.delete(message.author.id);
            return;
        }

        //started Pracc
        set.add(user.id);
        map.set(message.author.id, startPracc);

        praccEmbed.color = 0x77dd77;
        praccEmbed.author = {name:`${user.tag} is practicing!`, icon_url: user.avatarURL};
        praccEmbed.timestamp = Date.now();


        message.channel.send({embed: praccEmbed}).then(message.delete());

        
    }
}

      
      