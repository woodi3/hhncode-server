import { DB, IDeleteResponse } from '../database/types';
import { ITagDocument, Query } from '../database/tags/tags.types';

export default class TagService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async getTags(): Promise<ITagDocument[]> {
        return await this.db.TagModel.getTags({});
    }

    /**
     * Gets the tags for a post.
     * @param post Post object
     */
    async getTagsByIds(tagIds: string[]): Promise<ITagDocument[]> {
        return await this.db.TagModel.getTags({ _id: { $in: tagIds } });
    }

    async save(tag: ITagDocument): Promise<ITagDocument | null> {
        if (tag._id) {
            return await this.db.TagModel.updateTag(tag);
        }
        return await this.db.TagModel.createTag(tag);
    }

    async deleteTag(query: Query): Promise<IDeleteResponse> {
        return await this.db.TagModel.deleteTag(query);
    }
}
