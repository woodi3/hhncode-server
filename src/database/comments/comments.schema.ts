import { Schema } from 'mongoose';
import { getComment, getComments, deleteComment, createComment, updateComment } from './comments.statics';
import { saveComment } from './comments.methods';
const CommentSchema = new Schema(
    {
        content: String,
        name: String,
        email: String,
        postId: String,
        reported: Boolean,
        userId: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

CommentSchema.statics.getComment = getComment;
CommentSchema.statics.getComments = getComments;
CommentSchema.statics.deleteComment = deleteComment;
CommentSchema.statics.createComment = createComment;
CommentSchema.statics.updateComment = updateComment;
CommentSchema.methods.saveComment = saveComment;

export default CommentSchema;
