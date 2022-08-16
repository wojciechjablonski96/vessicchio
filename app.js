/*
 * Copyright (C) 2021 Wojciech Jablonski All rights reserved.
 *
 * This document is the property of Wojciech Jablonski <info@wojciechjablonski.com>.
 * It is considered confidential and proprietary.
 *
 * This document may not be reproduced or transmitted in any form,
 * in whole or in part, without the express written permission of
 * Wojciech Jablonski <info@wojciechjablonski.com>.
 */

/* Libraries */
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require("dotenv");
const {SlashCreator, GatewayServer} = require('slash-create');
const {Player} = require('discord-player');
const path = require('path');
const fs = require('fs');

/* Client Inizialization */
dotenv.config();

const CatLoggr = require('cat-loggr');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        'GuildVoiceStates'
    ],
    partials: [
        Partials.Channel,
        Partials.Message] });

client.logger = new CatLoggr().setLevel(process.env.COMMANDS_DEBUG === 'true' ? 'debug' : 'info');

client.player = new Player(client);

const creator = new SlashCreator({
    applicationID: process.env.APPLICATION_ID,
    publicKey: process.env.PUBLIC_KEY,
    token: process.env.TOKEN,
});

creator.on('debug', (message) => client.logger.log(message));
creator.on('warn', (message) => client.logger.warn(message));
creator.on('error', (error) => client.logger.error(error));
creator.on('synced', () => client.logger.info('Slash commands synced!'));

creator.on('commandRun', (command, _, ctx) => {
    client.logger.info(`[${client.guilds.cache.get(ctx.guildID).name} (${ctx.guildID})] ${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`)
});
creator.on('commandRegister', (command) =>
    client.logger.info(`Registered command ${command.commandName}`));
creator.on('commandError', (command, error) => client.logger.error(`Command ${command.commandName}:`, error));

creator
    .withServer(
        new GatewayServer(
            (handler) => client.ws.on('INTERACTION_CREATE', handler)
        )
    )
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .syncCommands({
        syncPermissions: true
    });

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
    client.logger.info(`Loaded event ${file}`);
    const eventName = file.split(".")[0];
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.create(...args));
    delete require.cache[require.resolve(`./events/${file}`)];

}

const player = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'));
for (const file of player) {
    client.logger.info(`Loaded player event ${file}`);
    const eventName = file.split(".")[0];
    const event = new (require(`./events/player/${file}`))(client);
    client.player.on(eventName, (...args) => event.create(...args));
    delete require.cache[require.resolve(`./events/player/${file}`)];

}

client.login(process.env.TOKEN);

module.exports = {
    client
};
