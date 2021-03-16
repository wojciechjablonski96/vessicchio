//---------- IMPORTS ----------

//main
const dotenv = require("dotenv").config();
const Discord = require('discord.js');

//events
const ready = require('./events/ready');
const message = require('./events/message');
const guildCreate = require('./events/guildCreate');
const guildDelete = require('./events/guildDelete');
//----------

//Creating discord client
const DiscordClient = new Discord.Client();


//---------- BOOT EVENTS ----------

//ready Event
ready.use(DiscordClient).then(() => {
    console.log('[BOOT] Loaded EVENT: ready');
}).catch(e => {
    console.log(e);
});

//message
message.use(DiscordClient).then(() => {
    console.log('[BOOT] Loaded EVENT: message');
}).catch(e => {
    console.log(e);
});

//guildCreate
guildCreate.use(DiscordClient).then(() => {
    console.log('[BOOT] Loaded EVENT: guildCreate');
}).catch(e => {
    console.log(e);
});

//guildDelete
guildDelete.use(DiscordClient).then(() => {
    console.log('[BOOT] Loaded EVENT: guildDelete')
}).catch(e => {
    console.log(e);
});

//----------

DiscordClient.login(process.env.TOKEN);
