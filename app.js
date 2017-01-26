var Discord = require('discord.js');
var client = new Discord.Client();


//var util = require('scripts/utility.js');
const config = require('./config.json')
const msg = require('./scripts/messages.js');

client.login(config.token);

client.on("guildMemberAdd", (member) => {
 member.guild.defaultChannel
 .sendMessage('Bem vindo '+ member.user.username +' ao server'+ member.guild.name
 +'\n Escreva [abreviacao_do_jogo para ser atribuido ao perfil: \n '
 +config.prefix+'tos se você ainda joga Tree of Savior \n '
 +config.prefix+'lol se você joga League of Legends \n '
 +config.prefix+'ow se você joga Overwatch');
});

client.on('message',function(message){
  let params = message.content.replace(config.prefix,'').split(" ");

//Test \/
  switch(message.content){
    case config.prefix+"clean":
    // get number of messages to prune
    let messagecount = parseInt(params[0]);
    let userIdMessageDelete = params[1].substring(3,21);

  // get the channel logs
    message.channel.fetchMessages({limit: 100})
   .then(messages => {
      let msg_array = messages.array();
      // filter the message to only your own

      if(userIdMessageDelete !== null || userIdMessageDelete !== undefined){
        msg_array = msg_array.filter(m => m.author.id === userIdMessageDelete);
      }

      // limit to the requested number + 1 for the command message
      msg_array.length = messagecount + 1;

      // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
      msg_array.map(m => m.delete()
      .catch(console.error))

   });
    break;
    case config.prefix+"bot":
        message.channel.sendMessage("I was created by <@!205074810810793984> to supply this server called "+message.channel.server.name+" of the Owner "+message.channel.server.owner.username);
    break;
    case config.prefix+"drole":
       client.roleDelete(params[1]);
    break;
    case config.prefix+"join":
      message.reply("I'd like join to your server: \n "+config.url_join+"");
    break;
    }
});
