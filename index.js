const Discord = require('discord.js');
const dotenv = require("dotenv");
dotenv.config()
const DiscordClient = new Discord.Client();
const Guild = require("./app/Guild.js");




DiscordClient.on('guildCreate', (guild) => {
  new Guild(guild);
});

DiscordClient.on('guildDelete', (guild) => {
  new Guild(guild).delete();
});

DiscordClient.on('ready', () => {
  //console.log(DiscordClient.guilds);
  console.log(`Logged in as ${DiscordClient.user.tag}!`);
});

DiscordClient.on('message', msg => {
  let server = new Guild(msg.guild);
  console.log(server.Owner);

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
DiscordClient.login(process.env.TOKEN);


module.exports = DiscordClient;
