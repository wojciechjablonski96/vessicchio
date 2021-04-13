const Message = require('../../app/Message');

module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            return new Message(message.channel)
                .createError('Currently, the bot is not playing anything!');
        case 'NotConnected':
            return new Message(message.channel)
                .createError('You are not connected in a voice channel!');
        case 'UnableToJoin':
            return new Message(message.channel)
                .createError('The bot is unable to join your channel, check permissions!');
        case 'VideoUnavailable':
            return new Message(message.channel)
                .createError(`${args[0].title} is not available in your country!`);
        case 'MusicStarting':
            return new Message(message.channel)
                .createError('Bot is starting, please wait!');
        default:
            return new Message(message.channel)
                .createError(`Something went wrong. ERROR: ${error}`);
    }
};