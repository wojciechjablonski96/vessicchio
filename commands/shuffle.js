/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */
const Music = require('../app/Music');
exports.use = async (client, args, message) => {
    await new Music(client, message).shuffle();
}
