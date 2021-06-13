/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "stop",
    description: "This command stops music and kick me from your channel!",
    aliases: [
        "st"
    ],
    permission: 1,
    args: false,
    module: "music",

    execute(client, message, args) {
        const music = new Music(client, message);
        music.stop().catch(e => console.log('[STOP COMMAND] ' + e));
    }
}

