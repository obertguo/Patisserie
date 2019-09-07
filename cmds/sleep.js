exports.run = (message, client) =>{

    let mention = message.mentions.members.map(m => m.user.id);

    if(mention.length === 0) mention = `<@${message.author.id}>`;
    
    for(i in mention){mention[i] = `<@${mention[i]}>`;};   

    message.channel.send(`***GO TO SLEEP ${mention === '<@' + message.author.id + '>' ? mention : mention.join(', ')}!***`).then(sentMsg =>{
        sentMsg.react(client.emojis.get('538193298725011457')).then(() => message.delete());
    });
}

exports.info = {
    description: 'Pings people to sleep. Feel free to ping Wulf >:) 😴'
}