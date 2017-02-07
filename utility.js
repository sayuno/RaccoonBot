var Discord = require('discord.js');

module.exports={
  deleteMessages:function (message,command, booRainbow)
  {
    let params = message.content.toLowerCase().replace(command,'').split(" ");
    // get number of messages to prune
    let messagecount = parseInt(params[0]);
    let userIdMessageDelete;
    if(params[1] !== undefined && params[1] !== null){
     userIdMessageDelete = params[1].substring(3,21);
    }
  // get the channel logs
    message.channel.fetchMessages({limit: 100})
   .then(messages => {
      let msg_array = messages.array();
      console.log(booRainbow);
      if(!booRainbow && (userIdMessageDelete !== null || userIdMessageDelete !== undefined)){
        msg_array = msg_array.filter(ms => ms.author.id === userIdMessageDelete);
        msg_array.length = messagecount + 1;
      }else if (booRainbow){
        msg_array = msg_array.filter(ms => ms.content === command);
      }



      msg_array.map(ms => ms.delete()
      .catch(console.error));
       });
 },
 makeEmbedMessage:function(channel){
 const embed = new Discord.RichEmbed()
  .setTitle('Very Nice Title')
  .setAuthor('Author Name', 'https://goo.gl/rHndF5')
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription('The text of the body, essentially')
  .setFooter('Nice text at the bottom', 'https://goo.gl/hkFYh0')
  .setImage('https://goo.gl/D3uKk2')
  .setThumbnail('https://goo.gl/lhc6ke')
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
  .addField('Field Title', 'Field Value')
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField('Inline Field', 'Hmm 🤔', true)
  /*
   * Blank field, useful to create some space.
   */
  .addField('\u200b', '\u200b', true)
  .addField('Second (3rd place) Inline Field', 'I\'m in the ZOONE', true);

channel.sendEmbed(
  embed,
  'this is some content but nobody cares',
  { disableEveryone: true }
);
 }


}
