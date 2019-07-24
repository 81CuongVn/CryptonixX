exports.run = function(client, message, args) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌**Error:** You don't have the **Manage Messages** permission!");
  if(!args[0]) return message.reply('Usage: purge all|bots|user|author|images <amount>')
  if(args[0] === 'all') {
    if(!args[1]) return message.channel.send("You need to specify an amount");
    if(parseInt(args[1]) == NaN) return message.channel.send("You need to specify a valid amount");
    if(parseInt(args[1]) > 100) return message.channel.send("I can only delete max 100 messages at a time :wink:")

    let messagecount = parseInt(args[1]);
    message.channel.fetchMessages({
      limit: 100
    }).then(messages => message.channel.bulkDelete(messagecount))
    .catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  else if(args[0] === 'bots') {
    if(!args[1]) return message.channel.send("You need to specify an amount");
    if(parseInt(args[1]) == NaN) return message.channel.send("You need to specify a valid amount");
    if(parseInt(args[1]) > 100) return message.channel.send("I can only delete max 100 messages at a time :wink:")

    message.channel.fetchMessages({
      limit: args[1]
    }).then(messages => {
      const userMessages = messages.filter(message => message.author.bot) 
      message.channel.bulkDelete(userMessages)
    }).catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  else if(args[0] === 'user') {
    if(!args[1]) return message.channel.send("You need to specify an amount");
    if(parseInt(args[1]) == NaN) return message.channel.send("You need to specify a valid amount");
    if(parseInt(args[1]) > 100) return message.channel.send("I can only delete max 100 messages at a time :wink:")

    message.channel.fetchMessages({
      limit: args[1]
    }).then(messages => {
      const userMessages = messages.filter(message => !message.author.bot) 
      message.channel.bulkDelete(userMessages)
    }).catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  else if(args[0] === 'author'){
    if(!args[2]) return message.channel.send("You need to specify an amount");
    if(parseInt(args[2]) == NaN) return message.channel.send("You need to specify a valid amount");
    if(parseInt(args[2]) > 100) return message.channel.send("I can only delete max 100 messages at a time :wink:")

    message.channel.fetchMessages({
      limit: parseInt(args[2])
    }).then(messages => {
      const userMessages = messages.filter(message => message.mentions.users.first() || message.author) 
      message.channel.bulkDelete(userMessages)
    }).catch(e => {
      if(e) return message.channel.send("Error: ", e)
    })
  }
  //else if(args[0] === 'startswith'){
  //  let args = args.join
  //  if(!args[2]) return message.channel.send("You need to specify an amount");
  //  if(parseInt(args[2]) == NaN) return message.channel.send("You need to specify a valid amount");
  //  if(parseInt(args[2]) > 100) return message.channel.send("I can only delete max 100 messages at a time :wink:")
//
  //  
  //}
  else if(args[0] === 'image') {
    message.reply("Upcoming feature :wink:")
  }
  else {
    message.reply('Usage: purge all|bots|user|author|images <amount>')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge all|bots|user|author|images <amount>'
};
