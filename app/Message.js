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

const Discord = require('discord.js');

class Message {
    constructor() {
        this.msg = new Discord.EmbedBuilder();
    }

    createError(errorMessage) {
        return this.msg
            .setColor(process.env.COLOR_ERROR)
            .setDescription(errorMessage);
    }

    createInfo(infoMessage) {
        return this.msg
            .setColor(process.env.COLOR_INFO)
            .setDescription(infoMessage)
    }

    createSong(queue, song, type) {
        this.msg
            .setDescription(song.title)
            .setTimestamp();

        if (type === 1) {
            this.msg.setTitle('Added to queue')
                .setColor(process.env.COLOR_SUCCESS)
                .addFields([
                    {
                        name: 'Requested by',
                        value: song.requestedBy ? song.requestedBy.username.toString() : 'Not available',
                        inline: false
                    },
                    {
                        name: 'Will be played in', value: queue.connection.channel.name.toString(),
                        inline: false
                    },
                ]);
        } else if (type === 0) {
            this.msg.setTitle('Now playing')
                .setThumbnail(song.thumbnail)
                .setColor(process.env.COLOR_INFO)
                .addFields([
                    {
                        name: 'Author', value: song.author ? song.author.toString() : 'Not available',
                        inline: true
                    },
                    {
                        name: 'Requested by',
                        value: song.requestedBy ? song.requestedBy.username.toString() : 'Not available',
                        inline: false
                    },
                    {
                        name: 'Views', value: song.views ? song.views.toString() : 'Not available',
                        inline: true
                    },
                    {
                        name: 'Duration', value: song.duration ? song.duration.toString() : 'Not available',
                        inline: true
                    },
                ]);
        } else if (type === 3) {
            const progress = queue.createProgressBar();
            this.msg.setTitle('Seeking song')
                .setColor(process.env.COLOR_PRIMARY)
                .addFields([
                    {
                        name: '\u200b',
                        value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                    }
                ]);
        }
        return this.msg;
    }
}

module.exports = Message;
