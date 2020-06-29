import { ITagDocument, ITagModel, Query, ITag } from './tags.types';
import { IDeleteResponse } from '../types';

export async function getTag(this: ITagModel, query: Query): Promise<ITagDocument | null> {
    const record = await this.findOne(query);
    return record;
}

export async function getTags(this: ITagModel, query: Query): Promise<ITagDocument[]> {
    const records = await this.find(query);
    return records;
}

export async function deleteTag(this: ITagModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createTag(this: ITagModel, tag: ITag): Promise<ITagDocument> {
    return await this.create(tag);
}

export async function updateTag(this: ITagModel, tag: ITagDocument): Promise<ITagDocument | null> {
    return await this.findByIdAndUpdate(tag._id, tag);
}
