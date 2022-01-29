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

const {SlashCommand} = require('slash-create');

const Message = require('../app/Message');

module.exports = class PingCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'ping',
            description: 'Shows webservice ping.',
        });

        this.filePath = __filename;
    }

    async run(ctx) {
        const {client} = require('..');
        return {
            embeds: [
                new Message().createInfo(`Webservice ping: ${client.ws.ping}ms`)
            ], ephemeral: false
        }
    }
}

