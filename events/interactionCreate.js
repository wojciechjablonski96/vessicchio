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

const Command = require('../app/Command');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create(interaction) {
        if (!interaction.isCommand()) return;

        if (!this.client.commands.has(interaction.commandName)) return;
        try {
            const command = new Command(interaction);
            await command.runCommand();
        } catch (error) {
            console.log(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }

    }
}