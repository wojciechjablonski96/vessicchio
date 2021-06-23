/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "skip",
    description: "If your friend's song is a shit you can skip it!",
    aliases: [
        "next",
        "sk"
    ],
    permission: 1,
    args: false,
    module: "music",

    execute(client, message, args) {
        const music = new Music(client, message);
        music.skip().catch(e => console.log('[SKIP COMMAND] ' + e));
    }
}

