const {SlashCommand} = require('slash-create');

const Message = require('../app/Message');

module.exports = class PingCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'ping',
            description: 'Shows webservice ping.',
        });

        this.filePath = __filename;
    }

    async run(ctx) {
        const {client} = require('..');
        return {
            embeds: [
                new Message().createInfo(`Webservice ping: ${client.ws.ping}ms`)
            ], ephemeral: false
        }
    }
}

