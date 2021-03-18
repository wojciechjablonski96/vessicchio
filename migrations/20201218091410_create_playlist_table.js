/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

exports.up = function (knex) {
    return knex.schema
        .createTable('playlist', table => {
            table.increments('id')
                .primary()
            table.string('guild')
            table.string('channel')
            table.string('added_by')
            table.text('title')
            table.text('url')
            table.timestamp('added')
                .defaultTo(knex.fn.now())
            table.timestamp('played')
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('playlist');
};
