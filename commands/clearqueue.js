/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "clearqueue",
    description: "Delete all queue songs.",
    aliases: [
        "cq"
    ],
    permission: 1,
    args: false,
    module: "music",

    execute(client, message, args) {

        const music = new Music(client, message);
        music.clearQueue().catch(e => console.log('[CLEARQUEUE COMMAND] '+ e));
    }
}
