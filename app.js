# 'This is JavaScript bot code, the code I am giving works 100% and already has commands programmed into it, you\'re welcome
# I have inserted things link "<your bots invite link>" and "<botName>" make sure to replace the following! (There are more of those, 
# I just gave two as an example'

# 'This will be your main bot file if you were wondering, although you could sort the commands and other stuff into other files 
# and call them'

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame("$$help | $$invite") // neat-o!
});

const prefix = "$$";

const responses = [
   'Yes, most definitely!', 'nep', 'Half, maybe 2', 'kayyy', 'Sure, I guess', 'Don\'t want to answer, ttml', 'Naw fam'
]

// Message Handler Event (Commands Go Inside)
client.on('message', message => {
  if(!message.content.startsWith(config.prefix)) return;

if(message.content.startsWith(prefix + 'ping')) {
 message.channel.send('pong!')
}

if(message.content.startsWith(prefix + 'invite')) {
 message.channel.send('To invite me to your server, go to: <your bots invite link>')
}

if(message.content.startsWith(prefix + 'rate')) {
  message.channel.send(`I'd rate **${message.author.username}** a(n) ${(Math.floor(Math.random() * 11))}\/10`)
}

if (message.content.startsWith(prefix + 'kick')) {
  if (!message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")) {
    message.channel.send('Sorry, I do not have permission to execute the \"kick" command!');
    return;
  } else if (!message.channel.permissionsFor(client.user).hasPermission("KICK_MEMBERS")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
  if(message.author === message.mentions.users.first().id) return;
  let userToKick = message.mentions.users.first();
  message.guild.member(userToKick).kick().catch(console.error);
  message.channel.send('Successfully kicked!')
}

if (message.content.startsWith(prefix + 'ban')) {
  if (!message.channel.permissionsFor(message.author).hasPermission("BAN_MEMBERS")) {
    message.channel.send('Sorry, I do not have permission to execute the \"ban" command!');
    return;
  } else if (!message.channel.permissionsFor(client.user).hasPermission("BAN_MEMBERS")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
  if(message.author === message.mentions.users.first().id) return;
  let userToBan = message.mentions.users.first();
  message.guild.member(userToBan).ban().catch(console.error);
  message.channel.send('Successfully banned!')
}

if (message.content.startsWith(prefix + 'roll')) {
  message.channel.send(`My number is... ${(Math.floor(Math.random() * 999))}`)
}

if (message.content.startsWith(prefix + 'ohfuk!')) {
  message.channel.send('https://cdn.discordapp.com/attachments/318322636700516352/319052440014159873/image.jpg')
}

if (message.content.startsWith(prefix + 'help')) {
  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: '<botName> Commands',
    description: 'These are the current commands for Abstract, the discord bot!',
    fields: [{
        name: 'ping',
        value: 'Tests bot connection, this also tells how long it took for the bot to respond, (aka. The delay) [Delay hasn\'t been implemented yet]'
      },
      {
        name: 'roll',
        value: 'Rolls a random number!'
      },
      {
        name: 'invite',
        value: 'Gives bot invite link, this is useful for adding the bot to your server!'
      },
      {
        name: 'rate',
        value: 'Will rate the user who said it'
      },
      {
        name: 'ohfuk!',
        value: 'Will show a funny \'Oh F%^*&\' reference'
      },
      {
        name: 'ban',
        value: 'Bans the user specified'
      },
      {
        name: 'kick',
        value: 'Kicks the user specified'
      },
      {
        name: 'avatar',
        value: 'Displays the users avatar! (Works with GIFs too!)'
      },
      {
        name: 'support',
        value: 'Directs you to the support server!'
      },
      {
        name: '8ball',
        value: 'The bot will respond to any question you throw at it! (This is, of course, with the set responses)'
      }
    ],
    footer: {
      icon_url: client.user.avatarURL,
      text: 'Credits: Your credits'
    }
  }
})

}

if (message.content.startsWith(prefix + 'avatar')) {
  message.channel.send(message.author.avatarURL)
}

if (message.content.startsWith(prefix + 'support')) {
  message.channel.send({embed: {
    color: 273746,
    description: 'For real-time support, and more, join: <your server url>'
} }) }

if (message.content.startsWith(prefix + '8ball')) {
   message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
}

});
// Commands will go up there, not below or above

client.login(config.token);

/* Make sure you have a config file before doing 'config.token'!
If not, just put your token there
*/
