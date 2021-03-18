/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const database = require('../inc/db');

class Guild {
    constructor(guild) {
        this.guild = guild;
    }

    async getGuild() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            await database('guilds')
                .where({id: that.guild.id})
                .then(rows => {
                    return resolve(rows[0]);
                })
        });
    }

    async newGuild() {
        let admins = Array();
        await this.guild.roles.cache.forEach(role => {
            if (role.permissions.has('ADMINISTRATOR')) {
                admins.push(role.id);
            }
        });

        await database('guilds').insert({
            id: this.guild.id,
            owner: this.guild.ownerID,
            administrators: JSON.stringify(admins),
            users: JSON.stringify(Array()),
            modules: JSON.stringify(Array('main')),
            locale: this.guild.preferredLocale,
            prefix: '!',
        }).catch(e => {
            console.log(e);
        });
    }

    async deleteGuild() {
        await database('guilds').where({id: this.guild.id}).del()
            .catch(e => {
                console.log(e);
            })
    }
}

module.exports = Guild;