const {SlashCommand, CommandOptionType} = require('slash-create');

const Message = require('../app/Message');

module.exports = class jumpCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'jump',
            description: 'Jump to a particular track',
            options: [
                {
                    name: 'track',
                    description: 'Queue\'s track number',
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
        const trackName = queue.songs[ctx.options.track - 1].name;
        await queue.jump(ctx.options.track - 1);

        return ctx.sendFollowUp({
            embeds: [
                new Message().createInfo('Jumped to ' + trackName)
            ], ephemeral: false
        });


    }
}

