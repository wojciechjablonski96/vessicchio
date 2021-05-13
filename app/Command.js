/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, April 2021
 */
const Guild = require('./Guild');
const Message = require('./Message');

class Command {
    constructor(client) {
        this.client = client;
    }

    async runCommand(message) {
        await new Guild(message.guild).getGuild().then(async guild => {
            if (guild) {
                await this.#isCommand(message, guild.prefix).then(async isCommand => {
                    if (isCommand) {
                        await this.#existCommand(message.content, guild.prefix).then(async command => {
                            if (command) {
                                await this.#checkModule(command, guild.modules).then(async avaiable => {
                                    if (avaiable) {
                                        await this.#checkPermission(command.permission, message.member, guild).then(async authorized => {
                                            if (authorized) {
                                                await this.#checkTrueChannel(command.module, message).then(async truechannel => {
                                                    if (truechannel) {
                                                        if (command.args === true && command.arguments.length > 0 || command.args === false) {
                                                            await command.execute(this.client, message, command.arguments);
                                                        } else {
                                                            await message.delete();
                                                            return await new Message(message.channel, process.env.ERROR_DELETE_TIEMOUT)
                                                                .createError('This command needs args! You can use !help for more info.');
                                                        }
                                                    } else {
                                                        //Nothing wrong channel error
                                                    }
                                                });
                                            } else {
                                                await message.delete();
                                                return await new Message(message.channel, process.env.ERROR_DELETE_TIEMOUT)
                                                    .createError('You do not have permission to use this command!');
                                            }
                                        });
                                    } else {
                                        await message.delete();
                                        return await new Message(message.channel, process.env.ERROR_DELETE_TIEMOUT)
                                            .createError('This command is not available on your discord server! \n Please contact our support!');

                                    }
                                });
                            }
                        }).catch(e => {
                            //NOTHING
                        });
                    } else {
                        //NOTHING
                    }
                });
            }
        });
    }

    async #checkTrueChannel(module, message) {
        return new Promise(async function (resolve) {
            await new Guild(message.guild).getGuild().then(async guild => {
                let channels = JSON.parse(guild.channels);
                if (!channels.hasOwnProperty(module)) {
                    return resolve(true);
                } else {
                    if (channels[module].includes(message.channel.id))
                        return resolve(true);
                    else return resolve(false);
                }
            });
        });
    }

    async #checkPermission(permission, member, guild) {
        return new Promise(async function (resolve) {
            switch (permission) {
                case 3:
                    if (member.id === guild.owner) return resolve(true);
                    else return resolve(false);
                case 2:
                    if (member.id === guild.owner) return resolve(true);
                    else if (member.roles.cache.some(r => JSON.parse(guild.administrators).includes(r.id))) return resolve(true);
                    else return resolve(false);
                case 1:
                    if (member.id === guild.owner) return resolve(true);
                    else if (member.roles.cache.some(r => JSON.parse(guild.administrators).includes(r.id))) return resolve(true);
                    else if (member.roles.cache.some(r => JSON.parse(guild.users).includes(r.id))) return resolve(true);
                    else return resolve(false);
            }
        });
    }

    async #existCommand(cmd, prefix) {
        let that = this;
        return new Promise(function (resolve, reject) {
            const args = cmd.slice(prefix.length).trim().split(/ +/g);

            const command = args.shift().toLowerCase();

            try {
                const cmd = that.client.commands.get(command) || that.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
                if(cmd) {
                    cmd.arguments = args;
                    return resolve(cmd);
                }
                else return resolve(false);
            } catch (e) {
                return reject(e);
            }
        });
    }

    async #checkModule(cmd, modules) {
        return JSON.parse(modules).includes(cmd.module);
    }

    async #isCommand(message, prefix) {
        return new Promise(function (resolve) {
            if (message.content.indexOf(prefix)) return resolve(false);
            else return resolve(true);
        });
    }
}

module.exports = Command;