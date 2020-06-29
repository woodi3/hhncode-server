import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export interface IComment {
    content: string;
    name: string;
    email: string;
    postId: string;
    reported: boolean;
    userId: string;
}

export interface ICommentDocument extends IComment, Document {
    saveComment: (this: ICommentDocument) => Promise<ICommentDocument>;
}

type Props = '_id' | 'name' | 'email' | 'postId' | 'reported' | 'userId';

export type Query = MongooseFilterQuery<Pick<ICommentDocument, Props>>;

export interface ICommentModel extends Model<ICommentDocument> {
    getComment: (this: ICommentModel, query: Query) => Promise<ICommentDocument | null>;
    getComments: (this: ICommentModel, query: Query) => Promise<ICommentDocument[]>;
    deleteComment: (this: ICommentModel, query: Query) => Promise<IDeleteResponse>;
    createComment: (this: ICommentModel, comment: IComment) => Promise<ICommentDocument>;
    updateComment(this: ICommentModel, comment: ICommentDocument): Promise<ICommentDocument | null>;
}
