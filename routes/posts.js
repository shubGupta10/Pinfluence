const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageText: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Array,
        default: [], // iss array me hum jo jo user like krega uski id save krenge. iise hume pata chal jaayega ki kis user ne like kiya h
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;