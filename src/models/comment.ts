import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;