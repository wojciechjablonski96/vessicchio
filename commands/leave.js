/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "leave",
    description: "You can kick me from your channel!",
    aliases: [
        "lv", "quit"
    ],
    permission: 1,
    args: false,
    module: "music",

    execute(client, message, args) {
        const music = new Music(client, message);
        music.leave().catch(e => console.log('[LEAVE COMMAND] ' + e));
    }
}
