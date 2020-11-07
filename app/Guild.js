const Discord = require('discord.js');

const dbconnection = require("../inc/db.js");

class Guild {

    constructor(guild) {
        this.id = guild.id;
        this.isNewGuild().then(result => {
            if (result)
                this.loadOptions();
            else
                this.createOptions(guild);
        })
    }

    createOptions(guild) {
        this.channel_log = null;
        this.owner = guild.ownerID;
        this.administrators = [];
        this.users = [];
        this.locale = guild.preferredLocale;
        this.createconfigurationChannel(guild).then(id => {
            this.config_channel = id;
            this.store();
        });
    }

    createconfigurationChannel(guild) {
        let that = this;
        return new Promise(function (resolve, reject) {
            guild.channels.create(`configuration-vessicchio`,
                {
                    type: 'text'
                }).then(async c => {
                try {
                    let permissions = [
                        {
                            id: c.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: that.owner,
                            allow: ['VIEW_CHANNEL']
                        },
                    ];
                    await c.overwritePermissions(permissions).then(
                        c => {
                            resolve(c.id);
                        }
                    );
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    loadOptions() {
        this.get().then(results => {
            results.forEach(result => {
                this.channel_log = result.channel_log;
                this.config_channel = result.config_channel;
                this.owner = result.owner;
                this.administrators = result.administrators;
                this.users = result.users;
                this.locale = result.locale;
            });
        });
    }

    isNewGuild() {
        let that = this;
        return new Promise(function (resolve, reject) {
            dbconnection('guilds')
                .count('id as qty')
                .where('id', '=', that.id)
                .then(
                    (rows) => {
                        if (rows[0]['qty'] >= 1) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    })
                .catch(e => {
                    reject(e)
                })
        })
    }

    get() {
        let that = this;
        return new Promise(function (resolve, reject) {
            dbconnection('guilds')
                .where({id: that.id})
                .then(rows => {
                    resolve(rows)
                })
                .catch(e => {
                    reject(e)
                })
        });
    }

    update() {
        dbconnection('guilds')
            .where({id: this.id})
            .update({
                config_channel: this.config_channel,
                owner: this.owner,
                administrators: JSON.stringify(this.administrators),
                users: JSON.stringify(this.users),
                locale: this.locale
            }).catch(e => {
            console.log('error: ' + e)
        })
    }

    store() {
        dbconnection('guilds')
            .insert({
                id: this.id,
                config_channel: this.config_channel,
                owner: this.owner,
                administrators: JSON.stringify(this.administrators),
                users: JSON.stringify(this.users),
                locale: this.locale
            }).catch(e => {
            console.log('error: ' + e)
        })
    }

    delete() {
        dbconnection('guilds')
            .where({id: this.id})
            .del()
            .catch(e => {
                console.log('error: ' + e)
            })
    }

}

module.exports = Guild;
