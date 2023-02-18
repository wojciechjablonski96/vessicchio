const Discord = require('discord.js');

class Message {
    constructor() {
        this.msg = new Discord.EmbedBuilder();
    }

    createError(errorMessage) {
        return this.msg
            .setColor(process.env.COLOR_ERROR)
            .setDescription(errorMessage);
    }

    createInfo(infoMessage) {
        return this.msg
            .setColor(process.env.COLOR_INFO)
            .setDescription(infoMessage);
    }

    createSong(queue, song, type) {
        this.msg
            .setDescription(song.name)
            .setTimestamp();

        if (type === 1) {
            this.msg.setTitle('Added to queue')
                .setColor(process.env.COLOR_SUCCESS)
                .addFields([
                    {
                        name: 'Requested by',
                        value: song?.user.toString(),
                        inline: false
                    },
                    {
                        name: 'Will be played in', value: queue.textChannel.name.toString(),
                        inline: false
                    },
                ]);
        } else if (type === 0) {
            this.msg.setTitle('Now playing')
                .setThumbnail(song.thumbnail)
                .setColor(process.env.COLOR_INFO)
                .addFields([
                    {
                        name: 'Requested by',
                        value: song?.user.toString(),
                        inline: false
                    },
                    {
                        name: 'Views', value: song?.views.toString(),
                        inline: true
                    },
                    {
                        name: 'Duration', value: song?.formattedDuration.toString(),
                        inline: true
                    },
                ]);
        } else if (type === 3) {
           /* const progress = queue.createProgressBar();
            this.msg.setTitle('Seeking song')
                .setColor(process.env.COLOR_PRIMARY)
                .addFields([
                    {
                        name: '\u200b',
                        value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                    }
                ]);*/
        }
        return this.msg;
    }
}

module.exports = Message;
