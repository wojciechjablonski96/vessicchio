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
const Message = require('../../app/Message');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create(queue, error) {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
        queue.metadata.send({embeds: [new Message().createError(`Error emitted from the queue: ${error.message}`)]});
        if (queue) {
            if (!queue.playing) await queue.play();
        }
    }
}
