/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "resume",
    description: "Resume your paused music!",
    aliases: [
        "rs"
    ],
    permission: 1,
    args: false,
    module: "music",

    execute(client, message, args) {
        let music = new Music(client, message);
        music.resume().catch(e => console.log('[RESUME COMMAND] '+ e));
    }
}
