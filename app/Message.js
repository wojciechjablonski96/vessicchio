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
const Moment = require('moment');

class Message {
    constructor() {
        //Nothing
    }

    createError(errorMessage) {
        return new Discord.MessageEmbed()
            .setColor(process.env.COLOR_ERROR)
            .setDescription(errorMessage);
    }

    createInfo(infoMessage) {
        return new Discord.MessageEmbed()
            .setColor(process.env.COLOR_INFO)
            .setDescription(infoMessage)
    }

    createSong(queue, song, type) {
        let msg = new Discord.MessageEmbed()
            .setDescription(song.title)
            .setTimestamp();

        if (type === 1) {
            msg.setTitle('Added to queue');
            msg.setColor(process.env.COLOR_SUCCESS);
            msg.addFields([
                {name: 'Requested by', value: song.requestedBy ? song.requestedBy.username.toString() : 'Not available', inline: false},
                {name: 'Will be played in', value: queue.connection.channel.name.toString(), inline: false},
            ]);
        } else {
            msg.setTitle('Now playing');
            msg.setThumbnail(song.thumbnail);
            msg.setColor(process.env.COLOR_PRIMARY);
            msg.addFields([
                {name: 'Author', value: song.author ? song.author.toString() : 'Not available', inline: true},
                {name: 'Requested by', value: song.requestedBy ? song.requestedBy.username.toString() : 'Not available', inline: false},
                {name: 'Views', value: song.views ? song.views.toString() : 'Not available', inline: true},
                {name: 'Duration', value: song.duration ? song.duration.toString() : 'Not available', inline: true},
            ]);
        }
        return msg;
    }
}

module.exports = Message;
