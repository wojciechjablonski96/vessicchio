/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, April 2021
 */


const Message = require('./Message');

class Music {
    constructor(client, message) {
        this.client = client;
        this.message = message;
    }

    async play(song) {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) await this.client.player.play(this.message, song.join(" "), {firstResult: true});
                    else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return await new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async stop() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                await this.client.player.setRepeatMode(this.message, false);
                                if (this.client.player.stop(this.message)) return await new Message(this.message.channel).createInfo('Bot has been stopped');
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async skip() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                if(this.client.player.skip(this.message)) return await new Message(this.message.channel).createInfo('The current song has been skipped.');
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }


    async #isVoiceChannel() {
        let that = this;
        return new Promise(async function (resolve) {
            if (!that.message.member.voice.channel) return resolve(false);
            else return resolve(true);
        });
    }

    async #isSameVoiceChannel() {
        let that = this;
        return new Promise(async function (resolve) {
            if (that.message.guild.me.voice.channel && that.message.member.voice.channel.id !== that.message.guild.me.voice.channel.id) return resolve(false);
            else return resolve(true);
        });
    }

    async #isPlaying() {
        let that = this;
        return new Promise(async function (resolve) {
            if (!that.client.player.getQueue(that.message)) return resolve(false);
            else return resolve(true);
        });
    }
}

module.exports = Music;
