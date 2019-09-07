exports.run = (message, client, args) =>{

    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== '226457061959925761') return;

    let purge;
    !args[1] ? purge = 99 : purge = parseInt(args[1]);

    if(!Number.isInteger(purge) || purge < 1 || purge > 99) return message.channel.send('You can purge from 1-99 messages'); 

    message.channel.bulkDelete(purge + 1).catch(() => message.channel.send('⚠ Unable to delete messages that are more than 14 days old'));
}

exports.info = {
    description: 'Purges messages 👀'
}