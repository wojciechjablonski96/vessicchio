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

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create() {
        await this.client.user.setActivity("i'm trying slash commands on " + this.client.guilds.cache.size + " servers", {type: "LISTENING",});
        setInterval(async () => {
            await this.client.user.setActivity("i'm trying slash commands on " + this.client.guilds.cache.size + " servers", {type: "LISTENING",});
        },300000);
    }
}
