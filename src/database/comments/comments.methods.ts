import { ICommentDocument } from './comments.types';

export async function saveComment(this: ICommentDocument): Promise<ICommentDocument> {
    return await this.save();
}
