const Message = require('../../app/Message');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create(queue) {
            await queue.textChannel.send({embeds: [new Message().createInfo("The queue was ended.")]});
    }
}
