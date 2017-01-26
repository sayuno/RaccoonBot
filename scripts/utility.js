function deleteMessages(message, params)
{
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
}
