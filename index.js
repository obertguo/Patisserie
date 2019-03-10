const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix , token} = require('./config.json');
client.commands = new Discord.Collection();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://obertguo:windows8pro@ds123635.mlab.com:23635/patisserie';
const dbName = 'patisserie';




client.on('ready' , () =>{
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`${client.users.size} pianists need to pracc!` , {type : "STREAMING"});
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message' , message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;

    try {
    client.commands.get(command).execute(message, args);
    }
    catch (error) {
        console.log(`[ERROR]\n${error}`);
        message.channel.send(`:warning: __**\`Command Execution Failed.\`**__\n\`\`\`js\n${error}\`\`\``);
}
});



//Pracc Module

let startTime, endTime = 0;
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    if(newMember.user.bot) return;

    MongoClient.connect(url, {useNewUrlParser: true}, async function (err, mongoClient) {
        if (err) throw err;
        //console.log('Database Connection Successful.');

        const db = mongoClient.db(dbName);
        const collection = db.collection('users');
        let totalTime, totalTimeFormat;

        await collection.find({_id: newMember.id}).toArray(function (err, res){
            if(String(res.map(res => res._id)).length === 0){
              collection.insertOne({
                _id: newMember.id,
                totalTime: 0
            });
        }});

        //newMember unmuted
        if (newMember.mute === false && newMember.voiceChannelID !== null) startTime = Date.now();

        //newMember muted
        if (newMember.mute === true && newMember.voiceChannelID !== null) endTime = Date.now();

        //bug fix. Prevents user from gaining time when muted and rejoin vc. Makes sure user was in a vc earlier before 
        if (newMember.mute === true && oldMember.voiceChannelID === null) return;

        //if user disconnects vc unmuted, time will still be recorded since OR if user already muted
        if ((newMember.mute === false && newMember.voiceChannelID === null) || startTime < endTime && newMember.voiceChannelID !== null) {
            endTime = Date.now();
            totalTime = Math.round((endTime - startTime) / 1000);


            collection.updateOne({_id: newMember.id}, {$inc: {totalTime: totalTime}});

            totalTimeFormat = `${Math.floor(totalTime/3600)}H ${Math.floor(totalTime/60)}M ${totalTime}S`;
            console.log(`${newMember.user.tag} has practiced for ${totalTimeFormat}`);
            //client.channels.find(res => res.id === '535711433363685376').send(`${newMember.user.tag} has practiced for ${totalTimeFormat}`);
        }

    });
});

//End Pracc

client.login(token);