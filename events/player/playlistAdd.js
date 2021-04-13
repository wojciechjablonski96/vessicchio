const Message = require('../../app/Message');

module.exports = (client, message, queue, playlist) => {
    return new Message(message.channel)
        .createInfo(`${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs) !`)
};