exports.run = (message, client) =>{

    let mention = message.mentions.members.map(m => m.user.id);
    if(mention.length === 0) mention = '<@' + message.author.id + '>';

    for(i in mention){
        mention[i] = '<@' + mention[i] + '>';
    }
    
    const emojis = [
        '536355930485293064', 
        '538745940060930048', 
        '537816331504975892', 
        '536435206475743252', 
        '536355931408302081', 
        '617992518583320577',
        '618279078482542592',
        '540203923156500491',
        '618279090801344514',
        '539218605212958761'
    ];


    const getEmoji = client.emojis.get(emojis[Math.floor(Math.random() * emojis.length)]);

    message.channel.send((mention === `<@${message.author.id}>` ? `***I'll hug you uwu ${mention}***` : `***<@${message.author.id}> hugs ${mention.join(', ')}***`) + ' ' + (getEmoji.animated === true ? `<a:${getEmoji.name}:${getEmoji.id}>` : `<:${getEmoji.name}:${getEmoji.id}>`)).then(sentMsg =>{
        sentMsg.react(client.emojis.get(emojis[Math.floor(Math.random() * emojis.length)])).then(() => message.delete());
    });

}

exports.info = {
    description: 'Huguwu uwu ❤'
}