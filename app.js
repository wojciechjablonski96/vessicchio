//---------- IMPORTS ----------

//main
const dotenv = require("dotenv").config();
const Discord = require('discord.js');
const {Player} = require('discord-player');
const fs = require('fs');

//Creating discord client
const DiscordClient = new Discord.Client();
DiscordClient.player = new Player(DiscordClient);


const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
    console.log(`[BOOT] Loaded MAIN-EVENT: ${file}`);
    const event = require(`./events/${file}`);
    event.use(DiscordClient).catch(e => {
        console.log(e);
    });
}

const player = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'));
for (const file of player) {
    console.log(`[BOOT] Loaded SUB-EVENT: discord-player-${file}`);
    const event = require(`./events/player/${file}`);
    DiscordClient.player.on(file.split(".")[0], event.bind(null, DiscordClient));
}

DiscordClient.login(process.env.TOKEN);
