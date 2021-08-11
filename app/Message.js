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

    async createHelp(commands) {
        return new Discord.MessageEmbed()
            .setColor(process.env.COLOR_INFO)
            .setTitle('Vessicchio HELP')
            .setURL('https://vessicchio.termi.gg')
            .setAuthor(process.env.NAME)
            .setThumbnail(process.env.LOGO)
            .addFields(commands)
            .setFooter(process.env.COPY.toString() + Moment().format('YYYY') + ' | ' + process.env.VERSION.toString())
            .setTimestamp();
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

    createSong(song, client, type) {
        let msg = new Discord.MessageEmbed()
            .setDescription(song.title)
            .setAuthor(process.env.NAME)
            .setFooter(process.env.COPY.toString() + Moment().format('YYYY') + ' | ' + process.env.VERSION.toString())
            .setTimestamp();

        if (type === 1) {
            msg.setTitle('Added to queue');
            msg.setColor(process.env.COLOR_SUCCESS);
            msg.addFields([
                {name: 'Requested by', value: song.requestedBy.username, inline: false},
            ]);
        } else {
            msg.setTitle('Now playing');
            msg.setThumbnail(song.thumbnail);
            msg.setColor(process.env.COLOR_PRIMARY);
            msg.addFields([
                {name: 'Channel', value: song.author, inline: true},
                {name: 'Requested by', value: song.requestedBy.username, inline: true},

                {name: 'Views', value: song.views, inline: true},
                {name: 'Duration', value: song.duration, inline: true},
            ]);
        }
        return msg;
    }
}

module.exports = Message;