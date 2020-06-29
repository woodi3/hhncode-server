import { Query, ICommentModel, ICommentDocument, IComment } from './comments.types';
import { IDeleteResponse } from '../types';

export async function getComments(this: ICommentModel, query: Query): Promise<ICommentDocument[]> {
    return await this.find(query);
}
export async function getComment(this: ICommentModel, query: Query): Promise<ICommentDocument | null> {
    return await this.findOne(query);
}
export async function deleteComment(this: ICommentModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}
export async function createComment(this: ICommentModel, comment: IComment): Promise<ICommentDocument> {
    return await this.create(comment);
}
export async function updateComment(this: ICommentModel, comment: ICommentDocument): Promise<ICommentDocument | null> {
    return await this.findByIdAndUpdate(comment._id, comment);
}
