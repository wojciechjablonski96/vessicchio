/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

const Message = require('../app/Message');
const Guild = require('../app/Guild');

exports.use = async (client, args, message) => {
    switch (args[0]) {
        case 'help':
            return new Message(message.channel).createHelp([
                {name: '!options admin add @group', value: 'Add group to admins', inline:true},
                {name: '!options admin remove @group', value: 'Remove group from admins', inline:true},
                {name: '!options admin list', value: 'Show admin list', inline:true},
                {name: '\u200B', value: '\u200B'},
                {name: '!options user add @group', value: 'Add group to users', inline:true},
                {name: '!options user remove @group', value: 'Remove group from users', inline:true},
                {name: '!options user list', value: 'Show users list', inline:true},
                {name: '\u200B', value: '\u200B'},
                {name: '!options music add @TextChannel', value: 'Add text channel to music command list', inline:true},
                {name: '!options music remove @TextChannel', value: 'Remove text channel from music command list', inline:true},
                {name: '!options music list', value: 'Show music text channel list', inline:true},
            ]);
        case 'admin':
            switch (args[1]) {
                case 'add':
                    if (args[2]) {
                        if (args[2].startsWith('<@&') && args[2].endsWith('>')) {
                            let id = args[2].slice(3, -1);

                            if (id.startsWith('!')) {
                                id = id.slice(1);
                            }
                            await message.delete();
                            return await new Guild(message.channel.guild)
                                .addtoGroup('administrator', id, message);

                        } else {
                            await message.delete();
                            return await new Message(message.channel, 10)
                                .createError('You have to mention a valid role!');
                        }
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('You have to mention a valid role!');
                    }
                case 'remove':
                    if (args[2]) {
                        if (args[2].startsWith('<@&') && args[2].endsWith('>')) {
                            let id = args[2].slice(3, -1);

                            if (id.startsWith('!')) {
                                id = id.slice(1);
                            }
                            await message.delete();
                            return await new Guild(message.channel.guild)
                                .removefromGroup('administrator', id, message);
                        } else {
                            await message.delete();
                            return await new Message(message.channel, 10)
                                .createError('You have to mention a valid role!');
                        }
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('You have to mention a valid role!');
                    }
                case 'list':
                    await message.delete();
                    return await new Guild(message.channel.guild)
                        .viewGroup('administrator', message);
                default:
                    await message.delete();
                    return await new Message(message.channel, 10)
                        .createError('You have to choose between add, remove or list!');
            }
        case 'user':
            switch (args[1]) {
                case 'add':
                    if (args[2]) {
                        if (args[2].startsWith('<@&') && args[2].endsWith('>')) {
                            let id = args[2].slice(3, -1);

                            if (id.startsWith('!')) {
                                id = id.slice(1);
                            }
                            await message.delete();
                            return await new Guild(message.channel.guild)
                                .addtoGroup('user', id, message);
                        } else {
                            await message.delete();
                            return await new Message(message.channel, 10)
                                .createError('You have to mention a valid role!');
                        }
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('You have to mention a valid role!');
                    }
                case 'remove':
                    if (args[2]) {
                        if (args[2].startsWith('<@&') && args[2].endsWith('>')) {
                            let id = args[2].slice(3, -1);

                            if (id.startsWith('!')) {
                                id = id.slice(1);
                            }
                            await message.delete();
                            return await new Guild(message.channel.guild)
                                .removefromGroup('user', id, message);
                        } else {
                            await message.delete();
                            return await new Message(message.channel, 10)
                                .createError('You have to mention a valid role!');
                        }
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('You have to mention a valid role!');
                    }
                case 'list':
                    await message.delete();
                    return await new Guild(message.channel.guild)
                        .viewGroup('user', message);
                default:
                    await message.delete();
                    return await new Message(message.channel, 10)
                        .createError('You have to choose between add, remove or list!');
            }
        case 'prefix':
            switch (args[1]) {
                case 'set':
                    console.log('PREFIX SET');
                    break;
                case 'get':
                    console.log('PREFIX GET');
                    break;
            }
            break;
        case 'music':
            switch (args[1]) {
                case 'add':
                    if (args[2]) {
                        if (args[2].startsWith('<#') && args[2].endsWith('>')) {
                            let id = args[2].slice(2, -1);
                            await message.delete();
                            return await new Guild(message.channel.guild)
                                .addMusicChannel(message, id);
                        } else {
                            await message.delete();
                            return await new Message(message.channel, 10)
                                .createError('You have to mention a valid channel!');
                        }
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('You have to mention a valid channel!');
                    }
                case 'remove':
                    if (args[2]) {
                        if (args[2].startsWith('<#') && args[2].endsWith('>')) {
                            let id = args[2].slice(2, -1);
                            await message.delete();
                            return await new Guild(message.channel.guild)
                                .removeMusicChannel(message, id);
                        } else {
                            await message.delete();
                            return await new Message(message.channel, 10)
                                .createError('You have to mention a valid channel!');
                        }
                    } else {
                        await message.delete();
                        return await new Message(message.channel, 10)
                            .createError('You have to mention a valid channel!');
                    }
                case 'list':
                    await message.delete();
                    return await new Guild(message.channel.guild)
                        .viewMusicChannels(message);
                default:
                    await message.delete();
                    return await new Message(message.channel, 10)
                        .createError('You have to choose between add, remove or list!');
            }
        default:
            await message.delete();
            return await new Message(message.channel, 10)
                .createError('You have to choose between admin, user, prefix or music!');
    }
}
