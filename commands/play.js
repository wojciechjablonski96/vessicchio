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
const {QueryType} = require("discord-player");

module.exports = class playCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'play',
            description: 'Plays a song',
            options: [
                {
                    name: "query",
                    description: "The song you want to play",
                    type: CommandOptionType.STRING,
                    required: true
                }
            ]
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

        const searchResult = await client.player
            .search(ctx.options.query, {
                searchEngine: ctx.commandName === "soundcloud" ? QueryType.SOUNDCLOUD_SEARCH : QueryType.AUTO,
                requestedBy: ctx.user
            })
            .catch((e) => {
                console.log(e);
            });
        
        if (!searchResult || !searchResult.tracks.length) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("No results were found!")
            ], ephemeral: true
        });

        const queue = await client.player.createQueue(guild,
            {
                metadata: client.channels.cache.get(ctx.channelID),
                autoSelfDeaf: false,
                leaveOnEnd: false,
                leaveOnStop: true,
                leaveOnEmpty: true,
                ytdlOptions: {
                    requestOptions: {
                        headers: {
                            cookie: process.env.YOUTUBE_COOKIE
                        }
                    },
                    filter: 'audioonly',
                    quality: 'highestaudio',
                    highWaterMark: 1 << 25
                }
            });

        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            await client.player.deleteQueue(ctx.guildID);
            return ctx.sendFollowUp({
                embeds: [
                    new Message().createInfo("Could not join your voice channel!")
                ], ephemeral: true
            });
        }

        await ctx.sendFollowUp({
            embeds: [
                new Message().createInfo(`Adding your ${searchResult.playlist ? "playlist" : "track"} to the queue.`)
            ], ephemeral: true
        });

        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
}

