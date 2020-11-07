exports.up = function(knex) {
    return knex.schema.createTable('guilds', table => {
            table.string('id').notNullable().primary()
            table.string('config_channel').nullable()
            table.string('channel_log').nullable()
            table.string('owner').nullable()
            table.text('administrators').nullable()
            table.text('users').nullable()
            table.string('locale').nullable()
            table.timestamp('timestamp').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('guilds');
};
