const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// search

const dislikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    issueId: {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }
})

module.exports = mongoose.model("Dislike", dislikeSchema)