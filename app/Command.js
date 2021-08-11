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

const Guild = require('./Guild');
const Message = require('./Message');

class Command {
    constructor(interaction) {
        this.interaction = interaction;
    }

    async runCommand() {
        const guild = new Guild(this.interaction.guild);
        await guild.getGuild().then(async guild => {
            const command = await this.interaction.client.commands.get(this.interaction.commandName);
            await this.#checkModule(command, guild.modules).then(async available => {
                if (available) {
                    await this.#checkPermission(command.permission, this.interaction.member, guild)
                        .then(async authorized => {
                            if (authorized) {
                                await this.#checkTrueChannel(command.module, guild).then(async truechannel => {
                                    if (truechannel) {
                                        await command.execute(this.interaction);
                                    } else return this.interaction.reply({
                                        embeds: [new Message()
                                            .createError('You cannot use this command in this channel!')]
                                    , ephemeral: true});

                                });
                            } else return this.interaction.reply({
                                embeds: [new Message()
                                    .createError('You do not have permission to use this command!')]
                            , ephemeral: true});
                        });
                } else return this.interaction.reply({
                    embeds: [new Message()
                        .createError('This command is not available on your discord server! \\n Please contact our support!')]
                , ephemeral: true});
            });
        });
    }

    async #checkModule(cmd, modules) {
        return JSON.parse(modules).includes(cmd.module);
    }

    async #checkPermission(permission, member, guild) {
        return new Promise(async function (resolve, reject) {
            try {
                switch (permission) {
                    case 3:
                        if (member.id === guild.owner)
                            return resolve(true);
                        else
                            return resolve(false);
                    case 2:
                        if (member.id === guild.owner)
                            return resolve(true);
                        else if (member.roles.cache.some(r => JSON.parse(guild.administrators).includes(r.id)))
                            return resolve(true);
                        else
                            return resolve(false);
                    case 1:
                        if (member.id === guild.owner)
                            return resolve(true);
                        else if (member.roles.cache.some(r => JSON.parse(guild.administrators).includes(r.id)))
                            return resolve(true);
                        else if (member.roles.cache.some(r => JSON.parse(guild.users).includes(r.id)))
                            return resolve(true);
                        else
                            return resolve(false);
                }
            } catch (e) {
                return reject(e);
            }
        });
    }

    async #checkTrueChannel(module, guild) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let channels = JSON.parse(guild.channels);
                if (!channels.hasOwnProperty(module)) {
                    return resolve(true);
                } else {
                    if (channels[module].includes(that.interaction.channelId))
                        return resolve(true);
                    else
                        return resolve(false);
                }
            } catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = Command;