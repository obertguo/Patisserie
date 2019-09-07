exports.run = (message, client) =>{

    let mention = message.mentions.members.map(m => m.user.id);

    if(mention.length === 0) mention = `<@${message.author.id}>`;
    
    for(i in mention){mention[i] = `<@${mention[i]}>`;};   

    message.channel.send(`***STUDY ${mention === '<@' + message.author.id + '>' ? mention : mention.join(', ')}!***`).then(sentMsg =>{
        sentMsg.react('📚').then(() => message.delete());
    });
}

exports.info = {
    description: 'Pings people to study. Something mellow should work on 📚'
}