/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Message = require('../app/Message');
const Guild = require('../app/Guild');
const config = require('../inc/config.json');

exports.use = async (client, args, message) => {
    await new Guild(message.guild).getGuild().then(async guild => {
        let modules = JSON.parse(guild.modules);
        let commands = Array();

        await modules.forEach(module => {
            let title = {name: module.toUpperCase(), value: '\u200B'};
            commands.push(title);
            config.commands.forEach(cmd => {
                if (cmd.module === module) {
                    let command = {name: guild.prefix + cmd.cmd, value: cmd.description, inline: true};
                    commands.push(command);
                }
            });
        });

        await new Message(message.channel)
            .createHelp(commands);
    });
}
