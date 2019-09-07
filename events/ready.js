module.exports = (client) =>{
    console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity(`${client.users.size} pianists need to pracc!`, {type: "STREAMING"});
}