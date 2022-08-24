const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    issueId: {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment 