const mongoose = require('mongoose')
const Schema = mongoose.Schema

// search

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    issueId: {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

module.exports = mongoose.model("Like", likeSchema)