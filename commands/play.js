const {SlashCommand, CommandOptionType} = require('slash-create');

const Message = require('../app/Message');
const {client} = require("../app");
module.exports = class playCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'play',
            description: 'Plays a song',
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

        try{
            if(!client.distube.voices.get(ctx.guildID)) {
                await client.distube.voices.join(member.voice.channel);
                client.distube.voices.get(ctx.guildID).setSelfDeaf(false);
                client.distube.voices.get(ctx.guildID).setSelfMute(false);
            }
        } catch {
            await ctx.sendFollowUp({
                embeds: [
                    new Message().createInfo(`Could not join your voice channel!`)
                ], ephemeral: true
            });
        }

        await client.distube.play(member.voice.channel, ctx.options.query, {
            member: member,
            textChannel: channel
        });

        await ctx.sendFollowUp({
            embeds: [
                new Message().createInfo(`Adding your track/playlist to the queue.`)
            ], ephemeral: true
        });
    }
}

