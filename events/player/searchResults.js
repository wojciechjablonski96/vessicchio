module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};