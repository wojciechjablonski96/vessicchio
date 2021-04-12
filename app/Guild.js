/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, April 2021
 */
const database = require('../inc/db');
const Message = require('./Message');

class Guild {
    constructor(guild) {
        this.guild = guild;
    }

    async viewGroup(group, message) {
        await this.getGuild().then(async guild => {
            switch (group) {
                case 'administrator':
                    let admins = '';
                    await JSON.parse(guild.administrators).forEach(admin => {
                        admins += '<@&' + admin + '> \n';
                    });
                    if (!admins) admins = 'Nothing';
                    return new Message(message.channel, 0)
                        .createInfo('Administrators List', admins);
                case 'user':
                    let users = '';
                    await JSON.parse(guild.users).forEach(user => {
                        users += '<@&' + user + '> \n';
                    });
                    if (!users) users = 'Nothing';
                    return new Message(message.channel, 0)
                        .createInfo('Users List', users);
            }
        });
    }

    async addtoGroup(group, id, message) {
        await this.getGuild().then(async guild => {
            switch (group) {
                case 'administrator':
                    if (!JSON.parse(guild.administrators).includes(id)) {
                        let admins = Array();

                        await JSON.parse(guild.administrators).forEach(old => {
                            admins.push(old);
                        });

                        await admins.push(id);

                        await database('guilds').update({
                            administrators: JSON.stringify(admins),
                        }).where({id: guild.id}).then(() => {
                            return new Message(message.channel, 0)
                                .createInfo('Role added to administrators',
                                    '<@' + message.author.id + '> just added <@&' + id + '> to administrators.');
                        }).catch(e => {
                            console.log(e);
                        });

                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('This role is already administrator');
                    }
                    break;
                case 'user':
                    if (!JSON.parse(guild.users).includes(id)) {
                        let users = Array();

                        await JSON.parse(guild.users).forEach(old => {
                            users.push(old);
                        });

                        await users.push(id);

                        await database('guilds').update({
                            users: JSON.stringify(users),
                        }).where({id: guild.id}).then(() => {
                            return new Message(message.channel, 0)
                                .createInfo('Role added to users',
                                    '<@' + message.author.id + '> just added <@&' + id + '> to users.');
                        })
                            .catch(e => {
                                console.log(e);
                            });
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('This role is already user');
                    }
                    break;
            }
        });
    }

    async removefromGroup(group, id, message) {
        await this.getGuild().then(async guild => {
            switch (group) {
                case 'administrator':
                    if (JSON.parse(guild.administrators).includes(id)) {
                        let admins = Array();

                        await JSON.parse(guild.administrators).forEach(old => {
                            if (old !== id) {
                                admins.push(old);
                            }
                        });

                        await database('guilds').update({
                            administrators: JSON.stringify(admins),
                        }).where({id: guild.id}).then(() => {
                            return new Message(message.channel, 0)
                                .createInfo('Role removed from Administrators',
                                    '<@' + message.author.id + '> just removed <@&' + id + '> from administrators.');
                        }).catch(e => {
                            console.log(e);
                        });

                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('This role is not in Administrators',
                                '<@' + message.author.id + '> just tryied to remove <@&' + id + '> from administrators.');
                    }
                    break;
                case 'user':
                    if (JSON.parse(guild.users).includes(id)) {
                        let users = Array();

                        await JSON.parse(guild.users).forEach(old => {
                            if (old !== id) {
                                users.push(old);
                            }
                        });

                        await database('guilds').update({
                            users: JSON.stringify(users),
                        }).where({id: guild.id}).then(() => {
                            return new Message(message.channel, 0)
                                .createInfo('Role removed from Users',
                                    '<@' + message.author.id + '> just removed <@&' + id + '> from users.');
                        })
                            .catch(e => {
                                console.log(e);
                            });
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('This role is not in Users',
                                '<@' + message.author.id + '> just tryied to remove <@&' + id + '> from users.');
                    }
                    break;
            }
        });
    }

    async viewMusicChannels(message) {
        await this.getGuild().then(async guild => {
            var channels = JSON.parse(guild.channels);
            let msg = '';
            await channels.music.forEach(channel => {
                msg += '<#' + channel + '> \n';
            });
            if (!msg) msg = 'Nothing';
            return new Message(message.channel, 0)
                .createInfo('Music command channel List', msg);
        });
    }

    async addMusicChannel(message, id) {
        await this.getGuild().then(async guild => {
            var channels = JSON.parse(guild.channels);
            if (!channels.hasOwnProperty('music')) {
                channels.music = Array(id);
            } else {
                if (!channels.music.includes(id)) {
                    await channels.music.push(id);
                } else {
                    return await new Message(message.channel, 10)
                        .createError('This channel is also in music command channels',
                            '<@' + message.author.id + '> just tryied to add <#' + id + '> to music command channels.');
                }
            }

            await database('guilds').update({
                channels: JSON.stringify(channels),
            }).where({id: guild.id}).then(() => {
                return new Message(message.channel, 0)
                    .createInfo('Channel added to music command channels',
                        '<@' + message.author.id + '> just added <#' + id + '> to music command channel.');
            }).catch(e => {
                console.log(e);
            });
        });
    }

    async removeMusicChannel(message, id) {
        await this.getGuild().then(async guild => {
            var channels = JSON.parse(guild.channels);

            if (channels.hasOwnProperty('music')) {
                if (channels.music.includes(id)) {

                    for (var i = 0; i < channels.music.length; i++) {
                        if (channels.music[i] === id)
                            channels.music.splice(i);
                    }

                    if (channels.music.length <= 0) {
                        delete channels.music;
                    }

                    await database('guilds').update({
                        channels: JSON.stringify(channels),
                    }).where({id: guild.id}).then(() => {
                        return new Message(message.channel, 0)
                            .createInfo('Channel removed from music command channels',
                                '<@' + message.author.id + '> just removed <#' + id + '> from music command channel.');
                    }).catch(e => {
                        console.log(e);
                    });

                } else {
                    return await new Message(message.channel, 10)
                        .createError('This channel is not in music command channels',
                            '<@' + message.author.id + '> just tryied to remove <#' + id + '> from music command channels.');
                }
            }
        });
    }

    async getGuild() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            await database('guilds')
                .where({id: that.guild.id})
                .then(rows => {
                    return resolve(rows[0]);
                })
        });
    }

    async newGuild() {
        let admins = Array();
        await this.guild.roles.cache.forEach(role => {
            if (role.permissions.has('ADMINISTRATOR')) {
                admins.push(role.id);
            }
        });

        await database('guilds').insert({
            id: this.guild.id,
            owner: this.guild.ownerID,
            administrators: JSON.stringify(admins),
            users: JSON.stringify(Array()),
            modules: JSON.stringify(Array('main')),
            channels: '{}',
            locale: this.guild.preferredLocale,
            prefix: '!'
        }).catch(e => {
            console.log(e);
        });
    }

    async deleteGuild() {
        await database('guilds').where({id: this.guild.id}).del()
            .catch(e => {
                console.log(e);
            })
    }
}

module.exports = Guild;