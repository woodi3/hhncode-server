import { Schema } from 'mongoose';
import { getTag, getTags, deleteTag, createTag, updateTag } from './tags.statics';
import { saveTag } from './tags.methods';

const TagSchema = new Schema(
    {
        text: String,
        color: String,
        description: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

TagSchema.statics.getTag = getTag;
TagSchema.statics.getTags = getTags;
TagSchema.statics.deleteTag = deleteTag;
TagSchema.statics.createTag = createTag;
TagSchema.statics.updateTag = updateTag;
TagSchema.methods.saveTag = saveTag;

export default TagSchema;
