module.exports = (client) =>{
    client.on('ready', () => require('./ready.js')(client));
    client.on('message', message => require('./message.js')(client, message));
    client.on('messageDelete', (message) => require('./messageDelete.js')(message));

    client.on('reconnecting', () => console.log('RECONNECTING'));
    client.on('resume', () => console.log('RESUMED'));
    client.on('disconnect', () => console.log('DISCONNECTED'));
}