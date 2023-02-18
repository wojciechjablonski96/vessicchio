const {SlashCommand} = require('slash-create');

const Message = require('../app/Message');

module.exports = class leaveCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'leave',
            description: 'Kicks the bot from your channel.',
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

        if (!bot.voice.channel) return ctx.sendFollowUp({
            embeds: [
                new Message().createError("The bot is not in a voice channel!")
            ], ephemeral: true
        });

        await client.distube.voices.leave(ctx.guildID);

        return ctx.sendFollowUp({
            embeds: [
                new Message().createInfo("Leaving")
            ], ephemeral: false
        });
    }
}

