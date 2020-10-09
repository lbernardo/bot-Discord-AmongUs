const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const VoiceController = require('./VoiceController');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  if (msg.content === config.mute) {
    msg.channel.send(config.messageMute);
    msg.channel.guild.members.cache.map(member => {
      new VoiceController(Discord, msg.channel.guild, member).muteAll();
    })
  }
  if (msg.content === config.unmute) {
    msg.channel.send(config.messageUnmute);
    msg.channel.guild.members.cache.map(member => {
      new VoiceController(Discord, msg.channel.guild, member).unmuteAll();
    })
  }
});

client.login(config.token);