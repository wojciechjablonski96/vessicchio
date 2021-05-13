/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Message = require('../app/Message');
const Guild = require('../app/Guild');


module.exports = {
    cmd: "vessicchio",
    description: "Hello World, i can help you!",
    aliases: [
        "h"
    ],
    permission: 1,
    args: false,
    module: "main",

    execute(client, message, args) {
        new Guild(message.guild).getGuild().then(async guild => {
            let modules = JSON.parse(guild.modules);
            let commands = Array();

            await modules.forEach(module => {
                let title = {name: module.toUpperCase(), value: '\u200B'};
                commands.push(title);
                client.commands.forEach(cmd => {
                    if (cmd.module === module) {
                        let command = {
                            name: guild.prefix + cmd.cmd + ' (' + cmd.aliases.toString() + ')',
                            value: cmd.description,
                            inline: true
                        };
                        commands.push(command);
                    }
                });
            });

            await new Message(message.channel)
                .createHelp(commands);
        });
    }
}
