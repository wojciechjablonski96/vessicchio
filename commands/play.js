/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "play",
    description: "Yes, you can play songs with this command! Use !play title/youtube link",
    aliases: [
        "p"
    ],
    permission: 1,
    args: true,
    module: "music",

    execute(client, message, args) {
        const music = new Music(client, message);
        music.play(args).catch(e => console.log('[PLAY COMMAND] ' + e));
    }
}
