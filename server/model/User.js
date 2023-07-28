const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    playerScore:{
        type:[{
            score: Number
        }]
    },
    createdAt: Date
    });

    const User = model('User', userSchema, 'Users');

    module.exports = User;