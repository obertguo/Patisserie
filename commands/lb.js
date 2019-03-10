const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'hostURL';
const dbName = 'patisserie';
module.exports = {
    name: 'lb',
    description: "View leaderboard stats.",
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

            var lb = [];
            await collection.find({}).toArray(function (err, res){
                
                for(var i = 0; i< res.length; i++){
                    const user = message.client.users.find(restwo => restwo.id === res[i]._id).tag;
                    const secondsPracc = parseInt(res[i].totalTime);
                    const totalTimeFormat = `${Math.floor(secondsPracc/3600)}H ${Math.floor(secondsPracc/60)}M ${secondsPracc%60}S`;

                    lb[i] = `**${i+1}.** **\`${user} | ${totalTimeFormat}\`**`;
                    lb.push(lb[i]);
                    lb.pop();
                }
                

                const lbEmbed = new Discord.RichEmbed()
                .setTitle('Overall Leaderboard')
                .setDescription(lb)
                .setTimestamp()
                .setColor('#DB183E');

                message.channel.send({embed: lbEmbed}).then((sentMsg)=>{
                    message.delete();
                    sentMsg.delete(20000);
                });

            });
        });
    }
}