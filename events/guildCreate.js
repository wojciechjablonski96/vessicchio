/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

const Guild = require('../app/Guild');

exports.use = async (DiscordClient) => {
    DiscordClient.on('guildCreate', (guild) => {
        new Guild(guild).newGuild();
    });
}