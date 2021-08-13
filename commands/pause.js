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
    name: "pause",
    description: "Pause your music!",
    permission: 1,
    module: "music",

    async execute(interaction) {
        const music = new Music(interaction);
        await music.pause().catch(e => console.log('[PAUSE COMMAND] ' + e));
    }
}

