/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

const Command = require('../app/Command');

exports.use = async (DiscordClient) => {
    DiscordClient.on('message', (message) => {
        if (message.channel.type === 'dm') return;

        if (message.author.bot) return;

        new Command(DiscordClient).runCommand(message);
    });
}