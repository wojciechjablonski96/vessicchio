/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');

module.exports = {
    cmd: "shuffle",
    description: "Shuffle your queue!",
    aliases: [
        "sf"
    ],
    permission: 1,
    args: false,
    module: "music",

    execute(client, message, args) {
        new Music(client, message).shuffle().finally(() => {
        });
    }
}


