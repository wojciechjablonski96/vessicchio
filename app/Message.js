/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, April 2021
 */

const Discord = require('discord.js');
const Moment = require('moment');

class Message {
    constructor(entity, autodelete = 0) {

        this.entity = entity;

        if (autodelete !== 0)
            this.autodelete = autodelete * 1000;
        else
            this.autodelete = false;
    }

    async createHelp(commands) {
        let msg = new Discord.MessageEmbed()
            .setColor(process.env.COLOR_INFO)
            .setTitle('Vessicchio HELP')
            .setURL('https://vessicchio.termi.gg')
            .setAuthor(process.env.NAME)
            .setThumbnail(process.env.LOGO)
            .addFields(commands)
            .setFooter(process.env.COPY.toString() + Moment().format('YYYY') + ' | ' + process.env.VERSION.toString())
            .setTimestamp();
        return this.entity.send(msg).then(message => {
            if (this.autodelete)
                var timeout = setTimeout(function () {
                    message.delete();
                    clearTimeout(timeout);
                }, this.autodelete);
        });
    }

    createError(errorMessage, details = null) {

        let msg = new Discord.MessageEmbed()
            .setColor(process.env.COLOR_ERROR)
            .setFooter(errorMessage)

        if (details) msg.setDescription(details);

        return this.entity.send(msg).then(message => {
            if (this.autodelete)
                var timeout = setTimeout(function () {
                    message.delete();
                    clearTimeout(timeout);
                }, this.autodelete);
        });
    }

    createInfo(infoMessage, details = null) {

        let msg = new Discord.MessageEmbed()
            .setColor(process.env.COLOR_INFO)
            .setFooter(infoMessage)


        if (details) msg.setDescription(details);

        return this.entity.send(msg).then(message => {
            if (this.autodelete)
                var timeout = setTimeout(function () {
                    message.delete();
                    clearTimeout(timeout);
                }, this.autodelete);
        });
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
            msg.setImage(song.thumbnail);
            msg.setColor(process.env.COLOR_PRIMARY);
            msg.addFields([
                {name: 'Channel', value: song.author, inline: true},
                {name: 'Requested by', value: song.requestedBy.username, inline: true},

                {name: 'Views', value: song.views, inline: true},
                {name: 'Duration', value: song.duration, inline: true},
            ]);
        }

        return this.entity.send(msg).then(message => {
            if (this.autodelete)
                var timeout = setTimeout(function () {
                    message.delete();
                    clearTimeout(timeout);
                }, this.autodelete);
        });
    }
}

module.exports = Message;