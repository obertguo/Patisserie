module.exports = (client, message) =>{
    if(message.author.bot || !message.content.startsWith(client.prefix)) return;
    
    const args = message.content.toLowerCase().split(client.prefix)[1].split(' ').filter(v => v!== '');
    const cmd = args[0];
    
    if(!client.commands.has(cmd)) return;

    try{
        client.commands.get(cmd).exec.run(message, client, args);
    } catch(err) {
        message.channel.send(`:warning: __**\`Command Execution Failed.\`**__\n\`\`\`js\n${err}\`\`\``);
        console.error(`ERR:\n${err}`);
    }
}