import { IPostDocument, IPostModel, Query, IPost } from './posts.types';
import { IDeleteResponse } from '../types';

const POST_LIMIT = 25;

export async function getPost(this: IPostModel, query: Query): Promise<IPostDocument | null> {
    const record = await this.findOne(query);
    return record;
}

export async function getPosts(this: IPostModel, query: Query, limit?: number): Promise<IPostDocument[]> {
    const records = await this.find(query)
        .sort({ createdAt: 'desc' })
        .limit(limit === undefined ? POST_LIMIT : limit);
    return records;
}

export async function deletePost(this: IPostModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createPost(this: IPostModel, post: IPost): Promise<IPostDocument> {
    return await this.create(post);
}

export async function updatePost(this: IPostModel, post: IPostDocument): Promise<IPostDocument | null> {
    return await this.findByIdAndUpdate(post._id, post);
}
