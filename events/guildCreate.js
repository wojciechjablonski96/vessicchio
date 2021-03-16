const Guild = require('../app/Guild');

exports.use = async (DiscordClient) => {
    DiscordClient.on('guildCreate', (guild) => {
        new Guild(guild).newGuild();
    });
}