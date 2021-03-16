const Guild = require('../app/Guild');

exports.use = async (DiscordClient) => {
    DiscordClient.on('guildDelete', (guild) => {
        new Guild(guild).deleteGuild();
    });
}