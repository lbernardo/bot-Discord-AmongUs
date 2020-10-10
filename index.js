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
    msg.guild.members.cache.map(member => {
      console.log(`Mute ${member.user.username}`);
      msg.channel.send(config.messageMute,{reply: member});
      new VoiceController(Discord, msg.guild, member).muteAll();
    });
  }
  if (msg.content === config.unmute) {
    msg.guild.members.cache.map(member => {
      console.log(`Unmute ${member.user.username}`);
      msg.channel.send(config.messageUnmute,{reply: member});
      new VoiceController(Discord, msg.guild, member).unmuteAll();
    });
  }
})

client.login(config.token);