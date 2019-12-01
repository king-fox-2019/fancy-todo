const {Schema, model, models} = require('mongoose');

const userSchema = new Schema(
    {
        userName: String,
        password: String
    }
);

const User = model('User', userSchema);

module.exports = {
    User
};