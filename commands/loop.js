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

const {SlashCommand, CommandOptionType} = require('slash-create');
const {QueueRepeatMode} = require('discord-player');

const Message = require('../app/Message');

module.exports = class loopCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'loop',
            description: 'Enable/disable loops',
            options: [
                {
                    name: 'mode',
                    type: CommandOptionType.INTEGER,
                    description: 'Loop type',
                    required: true,
                    choices: [
                        {
                            name: 'Off',
                            value: QueueRepeatMode.OFF
                        },
                        {
                            name: 'Track',
                            value: QueueRepeatMode.TRACK
                        },
                        {
                            name: 'Queue',
                            value: QueueRepeatMode.QUEUE
                        },
                        {
                            name: 'Autoplay',
                            value: QueueRepeatMode.AUTOPLAY
                        }
                    ]
                }]
        });
        this.filePath = __filename;
    }

    async run(ctx) {

        const {client} = require('..');
        const guild = client.guilds.cache.get(ctx.guildID);
        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);

        await ctx.defer();

        if (!member.voice.channel) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("You are not in a voice channel!")
            ], ephemeral: true
        })

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("This bot is not playing right now!")
            ], ephemeral: true
        });


        const loopMode = ctx.options.mode;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

        return ctx.sendFollowUp({
            embeds: [
                new Message().createInfo(success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!')
            ], ephemeral: false
        });
    }
}

