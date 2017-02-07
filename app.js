var Discord = require('discord.js');
var client = new Discord.Client();
const config = require('./config.json');
const alpha = require('./alpha_pt.json');
const SERVER_NAME = config.server;

var util = require('./utility.js');

var colorIndex = 0;

var commands = require('./commands.js');
const MSG = require('./messages.js');
const RAINBOW = require('./rainbow.js');

client.on("ready",function(){
  if(client.guilds.find('name',config.server))
  {
    client.guilds.find('name',config.server).channels.find('name','general')
      .sendMessage(`Hi fuckers I'm Online!`);
  }

});

client.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.sendMessage(MSG.MS_WELCOME);
});

client.on("guildMemberRemove", (member)=>{
  member.channels.find('name','general')
  .sendMessage(MSG.MS_MEMBER_REMOVE).catch(console.error);
});

client.on("message", m => {
   var msgContent = m.content.toLowerCase();
   var server = m.channel.server;

   var user = m.author;
   var role;

   var channel;
   var reserved;
   var comando = msgContent.split(' ')[0];

  switch(comando){
    case commands.cleanMessages:
      util.deleteMessages(m, commands.cleanMessages, false);
    break;
    case  commands.joinServer:
      m.reply(MSG.MS_JOIN+config.url_join);
    break;

    case commands.botDesc:
        m.channel.sendMessage(`I was created by ${config.author} to supply this server chamado ${m.guild.name}`);
    break;

//---@TODO TEST---------------------------------------------
    case commands.overwatch:
    //  m.guild.members.find('id',m.author.id).addRole(m.guild.roles.find("name", "Overwatch"));
    break;
    case commands.leagueOfLegends:
    //  m.guild.members.find('id',m.author.id).addRole(m.guild.roles.find("name", "League of Legends"));
    break;
    case "?":
      m.channel.sendMessage(`I don't know, brow, try search in the www.google.com`);
    break;
    case commands.konamiCode:
       console.log('Rainbow Unlocked '+m.author.username);
       m.channel.sendMessage("", {
       embed: {
        color: 3447003,
        author: {
          name: m.author.username,
          icon_url: m.author.avatarURL
        },
        title: 'Congratulations!!',
        description: `You've unlocked a secret of this server! \n`,
      }});
      //m.guild.members.find('id',m.author.id).addRole(m.channel.guild.roles.find("name","Rainbow"));
      util.deleteMessages(m, commands.konamiCode, true);
    break;

    }
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

client.login(config.token);
