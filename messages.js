const config = require('./config.json');
const alpha = require('./alpha_en.json');
const commands =require('./commands.js');

module.exports = {
  MS_DESC: `I was created by ${config.author} to supply this server called [server_name] of the Owner [bot_owner]`,
  MS_JOIN:  `I'd like ${alpha.join} in your ${alpha.server}: \n `,
  MS_WELCOME : `Type this to get your perfil: \n
 ${commands.treeOfSavior} if you still ${alpha.play} Tree of Savior \n
 ${commands.leagueOfLegends} if you ${alpha.play} League of Legends \n
 ${commands.overwatch} if you ${alpha.play} Overwatch \n
 `
}
