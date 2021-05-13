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
                                if (this.client.player.skip(this.message)) return await new Message(this.message.channel).createInfo('The current song has been skipped.');
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async leave() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        await this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                await this.client.player.setRepeatMode(this.message, false);
                                await this.client.player.stop(this.message);
                            }
                        });
                        if (this.message.guild.me.voice.channel) await this.message.guild.me.voice.kick().then(() => {
                            return new Message(this.message.channel).createInfo('Leaving');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async pause() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        await this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                await this.#isPaused().then(async Paused => {
                                    if (!Paused) {
                                        if (this.client.player.pause(this.message)) return new Message(this.message.channel).createInfo('Bot Paused');
                                    } else {
                                        return new Message(this.message.channel).createError('Already Paused');
                                    }
                                });
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async resume() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        await this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                await this.#isPaused().then(async Paused => {
                                    if (Paused) {
                                        if (this.client.player.resume(this.message)) return new Message(this.message.channel).createInfo('Bot has been resumed!');
                                    } else {
                                        return new Message(this.message.channel).createError('Bot is not Paused');
                                    }
                                });
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async shuffle() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        await this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                if (this.client.player.shuffle(this.message)) return new Message(this.message.channel)
                                    .createInfo('Queue shuffled with ' + this.client.player.getQueue(this.message).tracks.length + ' songs!');
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async loop() {
        await this.#isVoiceChannel(this.message).then(async inVoice => {
            if (inVoice) {
                await this.#isSameVoiceChannel(this.message).then(async inSameVoice => {
                    if (inSameVoice) {
                        await this.#isPlaying(this.message).then(async isPlaying => {
                            if (isPlaying) {
                                if (this.client.player.getQueue(this.message).loopMode) {
                                    this.client.player.setLoopMode(this.message, false);

                                    return new Message(this.message.channel)
                                        .createInfo('Queue loop disabled');
                                } else {
                                    this.client.player.setLoopMode(this.message, true);
                                    return new Message(this.message.channel)
                                        .createInfo('Queue loop enabled');
                                }
                            } else return await new Message(this.message.channel).createError('This bot is not playing now.');
                        });
                    } else return new Message(this.message.channel).createError('You are not in the same voice channel.');
                });
            } else return new Message(this.message.channel).createError('You are not in a voice channel.');
        });
    }

    async #isPaused() {
        let that = this;
        return new Promise(async function (resolve) {
            if (that.client.player.getQueue(that.message).paused) return resolve(true);
            else return resolve(false);
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
