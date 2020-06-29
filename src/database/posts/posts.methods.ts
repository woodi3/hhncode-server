import { IPostDocument } from './posts.types';

export async function savePost(this: IPostDocument): Promise<IPostDocument> {
    return await this.save();
}
