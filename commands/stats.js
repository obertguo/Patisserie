const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'hostURL';
const dbName = 'patisserie';
module.exports = {
    name: 'stats',
    description: "View pracc stats.",
    execute(message, args) {
        MongoClient.connect(url, {useNewUrlParser: true}, async function (err, mongoClient) {
            if (err) throw err;
    
            const db = mongoClient.db(dbName);
            const collection = db.collection('users');

            await collection.find({_id: message.author.id}).toArray(function (err, res){
                if(String(res.map(res => res._id)).length === 0){
                  collection.insertOne({
                    _id: newMember.id,
                    totalTime: 0
                });
            }});

            await collection.find({_id: message.author.id}).toArray(function (err, res){
                
                const secondsPracc = parseInt(res.map(res => res.totalTime));
                const totalTimeFormat = `${Math.floor(secondsPracc/3600)}H ${secondsPracc%60}M ${secondsPracc%60}S`;
                const statsEmbed = new Discord.RichEmbed()
                .setAuthor(`Stats for ${message.author.tag}`)
                .setThumbnail(`${message.author.avatarURL}`)
                .addField(`Overall Time`, `${totalTimeFormat}`)
                .setFooter(`User practiced for ${secondsPracc}S.`)
                .setTimestamp()
                .setColor('#DB183E');
                message.channel.send({embed: statsEmbed}).then((sentMsg)=>{
                    message.delete();
                    sentMsg.delete(20000);
                });
            });
        });
    },
}