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
        /*
        setInterval(() => {
            const queues = this.client.player.queues.size;
            const servers = this.client.guilds.cache.size;
            const totalMembers = this.client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0);
            this.client.user.setActivity(queues + ' songs in ' + servers + " servers with " + totalMembers + " users.", {type: "LISTENING"});
        }, 300000);

         */
    }
}
