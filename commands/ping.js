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

module.exports = {
    name: "ping",
    description: "Controllo latenza BOT",
    permission: 2,
    module: "main",

    async execute(interaction) {
        await interaction.reply({ content:`Latenza client BOT: ${interaction.client.ws.ping}ms`});
    }
}