/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

exports.up = function (knex) {
    return knex.schema.createTable('guilds', table => {
        table.string('id').notNullable().primary()
        table.string('owner').nullable()
        table.text('administrators').nullable()
        table.text('users').nullable()
        table.string('locale').nullable()
        table.string('prefix').nullable()
        table.timestamp('timestamp').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('guilds');
};
