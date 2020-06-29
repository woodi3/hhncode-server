import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { ITagDocument } from '../tags/tags.types';
import { IPostMeta, IDeleteResponse } from '../types';
export interface IPost {
    title: string;
    headerImg: string;
    content: string;
    tags: ITagDocument[];
    isTutorial: boolean;
    isCode: boolean;
    isHipHop: boolean;
    isTrending: boolean;
    isDraft: boolean;
    isReview: boolean;
    totalViews: number;
    totalReads: number;
    totalWords: number;
    meta: IPostMeta;
}

export interface IPostDocument extends IPost, Document {
    savePost: (this: IPostDocument) => Promise<IPostDocument>;
}

type Props =
    | '_id'
    | 'title'
    | 'isTutorial'
    | 'isCode'
    | 'isHipHop'
    | 'totalWords'
    | 'isDraft'
    | 'meta'
    | 'isReview'
    | 'isTrending';

export type Query = MongooseFilterQuery<Pick<IPostDocument, Props>>;

export interface IPostModel extends Model<IPostDocument> {
    getPost: (this: IPostModel, query: Query) => Promise<IPostDocument | null>;
    getPosts: (this: IPostModel, query: Query, limit?: number) => Promise<IPostDocument[]>;
    deletePost: (this: IPostModel, query: Query) => Promise<IDeleteResponse>;
    createPost: (this: IPostModel, post: IPost) => Promise<IPostDocument>;
    updatePost(this: IPostModel, post: IPostDocument): Promise<IPostDocument | null>;
}
