exports.use = async (DiscordClient) => {
    DiscordClient.on('ready', () => {
        // console.log(`Logged in as ${DiscordClient.user.tag}!`);
    });
}