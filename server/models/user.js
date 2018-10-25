'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'Email should not be empty'],
        unique: [true,'Email should be unique'] 
    },
    password: {
        type: String,
        required: [true, 'Password should not be empty']
    }
},{
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User