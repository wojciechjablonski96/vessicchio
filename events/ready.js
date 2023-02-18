module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async create() {
        this.client.user.setPresence({
            activities: [
                {
                    name: this.client.guilds.cache.size + " guilds.",
                    type: 2
                }
            ]
        });
        setInterval(() => {
            this.client.user.setPresence({
                activities: [
                    {
                        name: this.client.guilds.cache.size + " guilds.",
                        type: 2
                    }
                ]
            });
        }, 300000);
    }
}
