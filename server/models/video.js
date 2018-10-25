'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    title: String,
    url: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

const Video = mongoose.model('Video', VideoSchema)

module.exports = Video