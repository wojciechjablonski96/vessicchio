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

const Message = require('../app/Message');

module.exports = class queueCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'queue',
            description: 'Shows your queue',
            options: [
                {
                    name: 'page',
                    type: CommandOptionType.INTEGER,
                    description: 'Queque\'s page',
                    required: false
                }
            ],
        });
        this.filePath = __filename;
    }

    async run(ctx) {

        const {client} = require('..');
        const guild = client.guilds.cache.get(ctx.guildID);
        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        const bot = guild.members.cache.get(ctx.data.application_id) ?? await guild.members.fetch(ctx.data.application_id);
        await ctx.defer();

        if (!member.voice.channel) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("You are not in a voice channel!")
            ], ephemeral: true
        });

        if (bot.voice.channelId && bot.voice.channel.id !== member.voice.channel.id) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("You are not in the same voice channel!")
            ], ephemeral: true
        });

        const queue = client.player.getQueue(ctx.guildID);

        if (!queue || !queue.playing) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("This bot is not playing right now!")
            ], ephemeral: true
        });

        if (!ctx.options.page) ctx.options.page = 1;
        const pageStart = 10 * (ctx.options.page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. [${m.title}](${m.url})`;
        });

        return ctx.sendFollowUp({
            embeds: [
                {
                    title: 'Current queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s) \n **Total queue pages:** ${pageEnd}`
                            : ''
                    }`,
                    color: parseInt(process.env.COLOR_PRIMARY),
                    fields: [{name: 'Now playing', value: `[${currentTrack.title}](${currentTrack.url})`}]
                }
            ]
        });


    }
}

