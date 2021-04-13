const Message = require('../../app/Message');

module.exports = (client, message, queue) => {
    return new Message(message.channel)
        .createInfo("There are no other songs in the queue!");
};