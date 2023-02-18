const {SlashCommand, CommandOptionType} = require('slash-create');

const Message = require('../app/Message');

module.exports = class topCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'top',
            description: 'Adds a song to the top of current queue',
            options: [
                {
                    name: "query",
                    description: "The song you want to play",
                    type: CommandOptionType.STRING,
                    required: true
                }
            ]
        });
        this.filePath = __filename;
    }

    async run(ctx) {

        const {client} = require('..');
        const guild = client.guilds.cache.get(ctx.guildID);
        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        const bot = guild.members.cache.get(ctx.data.application_id) ?? await guild.members.fetch(ctx.data.application_id);
        const channel = guild.channels.cache.get(ctx.channelID) ?? await guild.channels.fetch(ctx.channelID)

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

        await client.distube.play(member.voice.channel, ctx.options.query, {
            member: member,
            textChannel: channel,
            position: 1
        })

        await ctx.sendFollowUp({
            embeds: [
                new Message().createInfo(`Adding your playlist/track to the top of current queue.`)
            ], ephemeral: true
        });
    }
}

