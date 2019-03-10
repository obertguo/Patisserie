const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'hostURL';
const dbName = 'patisserie';
module.exports = {
    name: 'time',
    description: "Add/Del time.",
    execute(message, args) {

        if(message.author.id !== '226457061959925761') return;
        const targetUser = message.client.users.find(res => res.id === args[1]);
        const secondsToChange = parseInt(args[2]);
        if(!args[0]) return message.channel.send('Please use `add/del` args.');
        if(!targetUser) return message.channel.send('Please specify a user with their ID');
        if(!secondsToChange || Number.isInteger(secondsToChange) === false || secondsToChange < 0) return message.channel.send('Please provide valid time in seconds to add/del.');

        MongoClient.connect(url, {useNewUrlParser: true}, async function (err, mongoClient) {
            if (err) throw err;
    
            const db = mongoClient.db(dbName);
            const collection = db.collection('users');

            await collection.find({_id: args[1]}).toArray(function (err, res){
                if(String(res.map(res => res._id)).length === 0) return message.channel.send(`User \`${targetUser.tag} | ${args[1]}\` is not in db.`);

                if(args[0] === 'add'){
                    collection.updateOne({_id: args[1]}, {$inc: {totalTime: secondsToChange}});
                    message.channel.send(`Successfully added \`${secondsToChange}S\` to user \`${targetUser.tag} | ${args[1]}\`.`);
                }
        
                if(args[0] === 'del'){
                    if(parseInt(res.map(res => res.totalTime)) < secondsToChange) return message.channel.send('Specified time is greater than their time practiced.');
                    collection.updateOne({_id: args[1]}, {$inc: {totalTime: -secondsToChange}});
                    message.channel.send(`Successfully deleted \`${secondsToChange}S\` to user \`${targetUser.tag} | ${args[1]}\`.`);
                }

            });
            
        });
    }
}