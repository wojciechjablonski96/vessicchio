const Message = require('../../app/Message');

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create(queue, playlist) {
            queue.metadata.send({ embeds: [new Message().createInfo("Added " + playlist.name + " playlist with " +  playlist.songs.length + " songs.")]});
    }
}
