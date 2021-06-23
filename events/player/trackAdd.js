const Message = require('../../app/Message');

module.exports = (client, message, queue, track) => {
    return new Message(message.channel).createSong(track, client, 1);
};