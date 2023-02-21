const mongoose = require('mongoose');

const userCollection = 'user';

const userSchema = new mongoose.Schema({
    first_name: String,
    last: String,
    email: String,
    country: String
});

const User = mongoose.model(userCollection, userSchema);

module.exports = User;