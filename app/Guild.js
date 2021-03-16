const database = require('../inc/db');

class Guild {
    constructor(guild) {
        this.guild = guild;
    }

    getGuild() {
        let that = this;
        return new Promise(function (resolve, reject) {
            database('guilds')
                .where({id: that.guild.id})
                .then(rows => {
                    return resolve(rows[0]);
                })
        });
    }

    newGuild() {
        database('guilds').insert({
            id: this.guild.id,
            owner: this.guild.ownerID,
            administrators: JSON.stringify(Array()),
            users: JSON.stringify(Array()),
            locale: this.guild.preferredLocale,
            prefix: '!',
        }).catch(e => {
            console.log(e);
        });
    }

    deleteGuild() {
        database('guilds').where({id: this.guild.id}).del()
            .catch(e => {
                console.log(e);
            })
    }
}

module.exports = Guild;