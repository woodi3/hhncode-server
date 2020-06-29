import { Schema } from 'mongoose';
import { getPost, getPosts, deletePost, createPost, updatePost } from './posts.statics';
import { savePost } from './posts.methods';
const PostSchema = new Schema(
    {
        title: String,
        headerImg: String,
        content: String,
        meta: Object,
        tags: [Object],
        isTutorial: Boolean,
        isTrending: Boolean,
        isCode: Boolean,
        isReview: Boolean,
        isHipHop: Boolean,
        isDraft: Boolean,
        totalViews: Number,
        totalReads: Number,
        totalWords: Number,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

PostSchema.statics.getPost = getPost;
PostSchema.statics.getPosts = getPosts;
PostSchema.statics.deletePost = deletePost;
PostSchema.statics.createPost = createPost;
PostSchema.statics.updatePost = updatePost;
PostSchema.methods.savePost = savePost;

export default PostSchema;
