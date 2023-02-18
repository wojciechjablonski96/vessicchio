const {SlashCommand, CommandOptionType} = require('slash-create');

const Message = require('../app/Message');

module.exports = class seekCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'seek',
            description: 'Seek to the given time',
            options: [
                {
                    name: 'time',
                    description: 'The time to seek to (in seconds)',
                    type: CommandOptionType.INTEGER,
                    required: true
                }
            ],
        });
        this.filePath = __filename;
    }

    async run(ctx) {

        const {client} = require('..');
        const guild = client.guilds.cache.get(ctx.guildID);
        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        const bot = guild.members.cache.get(ctx.data.application_id) ?? await guild.members.fetch(ctx.data.application_id);
        await ctx.defer();

        if (!member.voice.channel) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("You are not in a voice channel!")
            ], ephemeral: true
        });

        if (bot.voice.channelId && bot.voice.channel.id !== member.voice.channel.id) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("You are not in the same voice channel!")
            ], ephemeral: true
        });

        const queue = client.distube.getQueue(ctx.guildID);

        if (!queue || !queue.playing) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("This bot is not playing right now!")
            ], ephemeral: true
        });

        const time = ctx.options.time * 1000;
        await queue.seek(time);

        return ctx.sendFollowUp({
            embeds: [
                new Message().createSong(queue,queue.song, 3)
            ], ephemeral: false
        });


    }
}

