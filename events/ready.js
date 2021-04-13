/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

exports.use = async (DiscordClient) => {
    DiscordClient.on('ready', () => {
        // console.log(`Logged in as ${DiscordClient.user.tag}!`);
    });
}