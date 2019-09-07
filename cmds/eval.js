exports.run = (message, client, args) => {

    if(message.author.id !== '226457061959925761') return message.channel.send('Bruh');

    const clean = text => {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      }

    try {

        let evaled = eval(args.splice(1).join(' '));

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
  
        message.channel.send(clean(evaled), {code:"js"});

    } catch (err) {message.channel.send(`:warning: __**\`Eval Command Execution Failed.\`**__\`\`\`js\n${clean(err)}\n\`\`\``);}
}

exports.info = {
    description: 'Evaluates JS. Don\'t even try 🚧'
}