const Message = require('../../app/Message');

module.exports = (client, message, track) => {
    return new Message(message.channel).createSong(track,client,0);
};