const Message = require('../../app/Message');

module.exports = (client, message, queue) => {
    return new Message(message.channel).createInfo('The channel is empty, stopped music.');
};