const config = require('../inc/config.json');
const database = require('../inc/db');
const Guild = require('./Guild');

/*
1) User
2) Administrator
3) Discord Owner
*/

class Command {
    constructor(client) {
        this.client = client;
    }

    async runCommand(message) {
        await new Guild(message.guild).getGuild().then(async guild => {
            if (guild) {
                await this.#isCommand(message, guild.prefix).then(async isCommand => {
                    if (isCommand) {
                        await this.#existCommand(message.content, guild.prefix).then(async command => {
                            if (command) {
                                await this.#checkPermission(command.permission, message.member, guild).then(async authorized => {
                                    if (authorized) {
                                        if (command.hasargs === true && command.args.length > 0 || command.hasargs === false) {
                                            await command.foundcmd.use(this.client, command.args, message);
                                        } else {
                                            console.log('NO ARGS');
                                        }
                                    } else {
                                        console.log('NO PERMISSION');
                                    }
                                });
                            }
                        }).catch(e => {
                            //NOTHING
                        });
                    } else {
                        //NOTHING
                    }
                });
            }
        });
    }

    async #checkPermission(permission, member, guild) {
        return new Promise(async function (resolve) {
            switch (permission) {
                case 3:
                    if (member.id === guild.owner) return resolve(true);
                    else return resolve(false);
                case 2:
                    if (member.roles.cache.some(r => JSON.parse(guild.users).includes(r.id))) return resolve(false);
                    if (member.roles.cache.some(r => JSON.parse(guild.administrators).includes(r.id))) return resolve(true);
                    if (member.id === guild.owner) return resolve(true);
                    else return resolve(false);
                case 1:
                    if (member.roles.cache.some(r => JSON.parse(guild.users).includes(r.id))) return resolve(true);
                    if (member.roles.cache.some(r => JSON.parse(guild.administrators).includes(r.id))) return resolve(true);
                    if (member.id === guild.owner) return resolve(true);
                    else return resolve(false);
            }
        });
    }

    async #existCommand(cmd, prefix) {
        return new Promise(function (resolve, reject) {
            const args = cmd.slice(prefix.length).trim().split(/ +/g);

            const command = args.shift().toLowerCase();

            try {
                let foundcmd = require(`../commands/${
                    config.commands.find(arrcommand => arrcommand.cmd === command).id}.js`);

                let permission = config.commands.find(arrcommand => arrcommand.cmd === command).permission;

                let hasargs = config.commands.find(arrcommand => arrcommand.cmd === command).args;

                return resolve({foundcmd, args, permission, hasargs});
            } catch (e) {
                return reject(e);
            }
        });
    }

    async #isCommand(message, prefix) {
        return new Promise(function (resolve) {
            if (message.content.indexOf(prefix)) return resolve(false);
            else return resolve(true);
        });
    }
}

module.exports = Command;