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
            console.log('HELP');
            break;
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
            }
            break;
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
            }
            break;
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
            }
            break;
    }
}
