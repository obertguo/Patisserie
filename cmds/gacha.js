const timeout = new Map();

exports.run = (message) => {

    const time = Date.now() - timeout.get(message.author.id);
    const timeoutDuration = 1000 * 60 * 60;
    const timeRemaining = timeoutDuration - time;

    if(time < timeoutDuration) return message.channel.send(`Please wait ${Math.floor((timeRemaining/(1000*60*60))%24)}H ${Math.floor((timeRemaining/(1000*60))%60)}M ${Math.floor((timeRemaining/1000)%60)}S before doing this again.`);


    if(!timeout.has(message.author.id) || time >= timeoutDuration) {

        const roles = message.guild.roles.map(r => r.name).filter(r => r.startsWith('[c]'));
        const int = Math.floor(Math.random() * roles.length);

        const roleWon = message.guild.roles.find(r => r.name === roles[int]);

        for(role of roles) {
            message.member.removeRole(message.guild.roles.find(r => r.name === role));
        }

        message.member.addRole(roleWon).then(() =>{
            message.channel.send(`You won ${roleWon.name}`);
        });
        
        timeout.set(message.author.id, Date.now());
    }  
}

exports.info = {
    description: 'Win a colour role 🌈'
}