/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
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

    createError(errorMessage) {
        return this.entity.send(
            new Discord.MessageEmbed()
                .setColor(process.env.COLOR_ERROR)
                .setTitle(errorMessage)
                .setAuthor(process.env.NAME)
                .setThumbnail(process.env.LOGO)
                .setFooter(process.env.COPY.toString() + Moment().format('YYYY') + ' | '+ process.env.VERSION.toString())
                .setTimestamp()
        ).then(message => {
            if (this.autodelete)
                var timeout = setTimeout(function () {
                    message.delete();
                    clearTimeout(timeout);
                }, this.autodelete);
        });
    }
}

module.exports = Message;