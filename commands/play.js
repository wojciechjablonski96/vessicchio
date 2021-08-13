/*
 * Copyright (C) 2021 Wojciech Jablonski All rights reserved.
 *
 * This document is the property of Wojciech Jablonski <info@wojciechjablonski.com>.
 * It is considered confidential and proprietary.
 *
 * This document may not be reproduced or transmitted in any form,
 * in whole or in part, without the express written permission of
 * Wojciech Jablonski <info@wojciechjablonski.com>.
 */

const Music = require('../app/Music');

module.exports = {
    name: "play",
    description: "Yes, you can play songs with this command! Use !play title/youtube link",
    options: [
        {
            name: "title",
            type: "STRING",
            description: "Title / link",
            required: true
        }
    ],
    permission: 1,
    module: "music",

    async execute(interaction) {
        const music = new Music(interaction);
        await music.play().catch(e => console.log('[PLAY COMMAND] ' + e));

    }
}
