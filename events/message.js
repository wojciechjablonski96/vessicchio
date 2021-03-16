const Command = require('../app/Command');

exports.use = async (DiscordClient) => {
    DiscordClient.on('message', (message) => {
        if (message.channel.type === 'dm') return;

        if (message.author.bot) return;

        new Command(DiscordClient).runCommand(message);
    });
}