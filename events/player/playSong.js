const Message = require('../../app/Message');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create(queue,track) {
            await queue.textChannel.send({embeds: [new Message().createSong(queue, track, 0)]});
    }
}
