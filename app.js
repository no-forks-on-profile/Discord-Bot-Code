/* This is JavaScript code, I used this with my bot, it's still in working order, as long as you're using the correct Node version.
This also comes with commands, I have highlighted certain zones where my bot link was, or my bot name was, for you to replace with your 
own.
*/

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame(`in ${client.guilds.size} guilds! | ~help`)
});

const prefix = "~";

const responses = [
   'Yes, most definitely!', 'Half, maybe 2', 'kayyy', 'Sure, I guess', 'Don\'t want to answer, ttml', 'nep', 'Naw fam'
]

const fcoin = [
  'Heads', 'Tails'
]

function clean(text) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
      return text;
}

client.on('guildCreate', guild => {
  guild.defaultChannel.send('Hey! Thanks for inviting me to your server!\n\n- To see my commands, do: ~help\nTo see my support server, go to: https://discord.gg/MUmX23Y')
});

// Message Handler Event (Commands Go Inside)
client.on('message', message => {
  if(!message.content.startsWith(config.prefix)) return;

let command = message.content.split(' ')[0];
command = command.slice(prefix.length);

let args = message.content.split(' ').slice(1);
if (Array.prototype.length == 0) return message.channel.send(`${message.author}, You must specify something to say!`);

if (message.content.startsWith(config.prefix + 'say')) {
  message.delete();
  message.channel.send({embed: {
  color: 0x00f735,
  description: `**${message.author.username} says... **` + (args.join(' '))
} }) }

if(message.content.startsWith(config.prefix + 'ping')) {
 message.channel.send(":ping_pong: Pong!").then(m => m.edit(`Roundtrip took: **${m.createdTimestamp - message.createdTimestamp}ms.** :heart:: **${Math.round(client.ping)}ms.**`))
}

if(message.content.startsWith(config.prefix + 'invite')) {
 message.channel.send('To invite me to your server, go to: https://discordapp.com/oauth2/authorize?permissions=468839622&scope=bot&client_id=316119422605721600')
}

if(message.content.startsWith(config.prefix + 'rate')) {
  message.channel.send(`I'd rate **${message.author.username}** a(n) ${(Math.floor(Math.random() * 11))}\/10`)
}

if (message.content.startsWith(config.prefix + 'kick')) {
  if (!message.member.permissions.has("KICK_MEMBERS")) {
    message.channel.send('Sorry, I do not have permission to execute the "kick" command!');
    return;
  } else if (!message.channel.permissionsFor(client.user).has("KICK_MEMBERS")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
  if(message.author.id === message.mentions.users.first().id) return;
  let userToKick = message.mentions.users.first();
  message.guild.member(userToKick).kick().catch(console.error);
  message.channel.send('Successfully kicked!')
}

if (message.content.startsWith(config.prefix + 'ban')) {
  if (!message.member.permissions.has("BAN_MEMBERS")) {
    message.channel.send('Sorry, I do not have permission to execute the "ban" command!');
    return;
  } else if (!message.channel.permissions(client.user).has("BAN_MEMBERS")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
  if(message.author.id === message.mentions.users.first().id) return;
  let userToBan = message.mentions.users.first();
  message.guild.member(userToBan).ban().catch(console.error);
  message.channel.send('Successfully banned!')
}

if (message.content.startsWith(config.prefix + 'roll')) {
  message.channel.send(`My number is... ${(Math.floor(Math.random() * 999))}`)
}

if (message.content.startsWith(config.prefix + 'ohfuk!')) {
  message.channel.send('https://cdn.discordapp.com/attachments/318322636700516352/319052440014159873/image.jpg')
}

if (message.content.startsWith(config.prefix + 'help')) {
  message.react('👌');
  message.channel.send('You\'ve been DMed a list of commands! :mailbox_with_mail:')
  message.author.send(`__Abstract Commands__\n\n__Fun__\n**ping**: Checks if the bot\'s still alive\n**roll**: Rolls a random number!\n**rate**: Will rate the user who said it\n**ohfuk!**: Will show a funny \'Oh F%^*&\'reference\n**8ball**: The bot will respond to any question you throw at it! (This is, of course, with the set responses)\n**flipcoin**: The bot will respond with either heads or tails!\n**say**: Will say the users input!\n**kiss**: Will kiss the user specified, how cute! o<3\n**gay**: Will call the user specified gay!\n**avatar**: Displays the users avatar! (Works with GIFs too!)\n**lenny**: Will create a lenny face!\n**tableflip**: The bot will throw tables!\n**unflip**: Unflips a table!\n\n__Moderation__\n**purge**: The bot will purge any message (Limit: 2 - 100 Messages)\n**ban**: Bans the user specified\n**kick**: Kicks the user specified\n\n__Utility__\n**support**: Directs you to the support server!\n**invite**: Gives bot invite link, this is useful for adding the bot to your server!`)
}

if (message.content.startsWith(config.prefix + 'avatar')) {
  message.channel.send(message.author.avatarURL)
}

if (message.content.startsWith(config.prefix + 'support')) {
  message.channel.send({embed: {
    color: 0xe0bee5,
    description: 'For real-time support, and more, join: https://discord.gg/nJVjcRt'
} }) }

if (message.content.startsWith(config.prefix + '8ball')) {
   message.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
}

if (message.content.startsWith(config.prefix + 'flipcoin')) {
  message.channel.send(`You flipped \`${fcoin[Math.floor(Math.random() * fcoin.length)]}\``);
}

if (message.content.startsWith(config.prefix + 'purge')) {
  message.delete();

  if (!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) {
    message.channel.send('Sorry, I do not have permission to execute the "purge" command!');
    return;
  } else if (!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
    message.channel.send("Sorry, I do not have permission to execute this command!");
    return;
  }
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[1])
if (!amount) return message.channel.send('Must specify an amount to delete!');
if (!amount && !user) return message.channel.send('Must specify a user and amount, or just an amount of messages to purge!');
message.channel.fetchMessages({
  limit: amount,
}).then((messages) => {
  if (user) {
    const filterBy = user ? user.id : client.user.id;
    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
  }
  message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
}) }

  if (message.content.startsWith(config.prefix + 'eval')) {
    if(message.author.id !== config.ownerID) return;
    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);

      message.channel.send(clean(evaled), {code:'xl'});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

  if (message.content.startsWith(config.prefix + 'kiss')) {
  let userToKiss = message.mentions.users.first();
  if (message.author === message.mentions.users) return;
  message.channel.send(`Aw shit, Aw shit, it's happening! ${message.author} just kissed ${userToKiss}!\n\nhttps://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif)}`)
}

let userIsGay = message.mentions.users.first();

if (message.content.startsWith(config.prefix + 'gay')) {
  if (message.author === message.mentions.users.first()) return;
  message.channel.send('Dumbass, you can\'t call yourself gay')

  message.channel.send(`${message.author} just called ${userIsGay} gay! :gay_pride_flag:`)
}

if (message.content.startsWith(config.prefix + 'lenny')) {
  message.channel.send('( ͡° ͜ʖ ͡°)')
}

if (message.content.startsWith(config.prefix + 'tableflip')) {
  message.delete();
  message.channel.send('(╯°□°）╯︵ ┻━┻')
}

if (message.content.startsWith(config.prefix + 'unflip')) {
  message.delete();
  message.channel.send('Whoops! Flipped another table, lemme get that. ┬──┬﻿ ¯\_(ツ)')
}

});
// Commands will go up there, not below or above

client.login(config.token);

/* Make sure you have a config file before doing 'config.token'!
If not, just put your token there
*/
