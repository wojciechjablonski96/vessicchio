const Message = require('../../app/Message');

module.exports = (client, message, query) => {
    return new Message(message.channel).createInfo(`No results found on YouTube for ${query} !`)
};