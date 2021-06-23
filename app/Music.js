/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, April 2021
 */


const Message = require('./Message');
const { Util } = require("discord-player");


class Music {
    constructor(client, message) {
        this.client = client;
        this.message = message;
    }

    async play(song) {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message)
        ]).then(async values => {
            if (!values[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!values[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');

            if (Util.isURL(song.join(" "))) return this.client.player.play(this.message, song.join(" "), { firstResult: true });
            const tracks = await Util.ytSearch(song.join(" "), {
                user: this.message.author,
                player: this.client.player
            }).catch(() => {});

            if (!tracks || !tracks.length) return this.message.channel.send("Track not found!");

            await this.client.player.play(this.message, tracks[0].url, {firstResult: true});

        }).catch(e => console.log('PLAY METHOD: ' + e));
    }

    async stop() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message)
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');

            if (this.client.player.stop(this.message)) return new Message(this.message.channel)
                .createInfo('Bot has been stopped');

        }).catch(e => console.log('STOP METHOD: ' + e));
    }

    async skip() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message)
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');

            if (this.client.player.skip(this.message)) return new Message(this.message.channel)
                .createInfo('The current song has been skipped.');

        }).catch(e => console.log('SKIP METHOD: ' + e));
    }

    async leave() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message)
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');

            if (res[2]) this.client.player.stop(this.message);

            if (this.message.guild.me.voice.channel)
                this.message.guild.me.voice.kick().then(() => {
                    return new Message(this.message.channel).createInfo('Leaving');
                });

        }).catch(e => console.log('LEAVE METHOD: ' + e));

    }

    async pause() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message),
            this.#isPaused()
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');
            if (res[3]) return new Message(this.message.channel)
                .createError('This bot is already Paused');

            if (this.client.player.pause(this.message)) return new Message(this.message.channel)
                .createInfo('Bot Paused');

        }).catch(e => console.log('PAUSE METHOD: ' + e));
    }

    async resume() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message),
            this.#isPaused()
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');
            if (!res[3]) return new Message(this.message.channel)
                .createError('This bot is not Paused');

            if (this.client.player.resume(this.message)) return new Message(this.message.channel)
                .createInfo('Bot has been resumed!');

        }).catch(e => console.log('RESUME METHOD: ' + e));
    }

    async shuffle() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message),
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');

            if (this.client.player.shuffle(this.message)) return new Message(this.message.channel)
                .createInfo('Queue shuffled with ' +
                    this.client.player.getQueue(this.message).tracks.length + ' songs!');


        }).catch(e => console.log('SHUFFLE METHOD: ' + e));
    }

    async clearQueue() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message),
            this.#isLongQueue()
        ]).then(res => {

            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');
            if (!res[3]) return new Message(this.message.channel)
                .createError('There is only one song in the queue.');

            this.client.player.clearQueue(this.message);
            return new Message(this.message.channel)
                .createInfo('Your queue was deleted.');


        }).catch(e => console.log('CLEARQUEUE METHOD: ' + e));
    }

    async loop() {
        await Promise.all([
            this.#isVoiceChannel(this.message),
            this.#isSameVoiceChannel(this.message),
            this.#isPlaying(this.message)
        ]).then(res => {
            if (!res[0]) return new Message(this.message.channel)
                .createError('You are not in a voice channel.');
            if (!res[1]) return new Message(this.message.channel)
                .createError('You are not in the same voice channel.');
            if (!res[2]) return new Message(this.message.channel)
                .createError('This bot is not playing now.');

            if (this.client.player.getQueue(this.message).loopMode) {
                this.client.player.setLoopMode(this.message, false);

                return new Message(this.message.channel).createInfo('Queue loop disabled.');
            } else {
                this.client.player.setLoopMode(this.message, true);
                return new Message(this.message.channel).createInfo('Queue loop enabled.');
            }
        });
    }

    async #isPaused() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                if (that.client.player.getQueue(that.message).paused)
                    return resolve(true);
                else
                    return resolve(false);
            } catch (e) {
                return reject(e);
            }
        });
    }

    async #isVoiceChannel() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                if (that.message.member.voice.channel)
                    return resolve(true);
                else
                    return resolve(false);
            } catch (e) {
                return reject(e);
            }

        });
    }

    async #isSameVoiceChannel() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                if (that.message.guild.me.voice.channel && that.message.member.voice.channel.id !== that.message.guild.me.voice.channel.id)
                    return resolve(false);
                else
                    return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    }

    async #isPlaying() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                if (!that.client.player.getQueue(that.message))
                    return resolve(false);
                else
                    return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    }

    async #isLongQueue() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                if (that.client.player.getQueue(that.message).tracks.length <= 1)
                    return resolve(false);
                else
                    return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = Music;
