import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export interface ITag {
    text: string;
    color: string;
    description: string;
}

export interface ITagDocument extends ITag, Document {
    saveTag: (this: ITagDocument) => Promise<ITagDocument>;
}

type Props = '_id' | 'text';

export type Query = MongooseFilterQuery<Pick<ITagDocument, Props>>;

export interface ITagModel extends Model<ITagDocument> {
    getTag: (this: ITagModel, query: Query) => Promise<ITagDocument | null>;
    getTags: (this: ITagModel, query: Query) => Promise<ITagDocument[]>;
    deleteTag: (this: ITagModel, query: Query) => Promise<IDeleteResponse>;
    updateTag(this: ITagModel, tag: ITagDocument): Promise<ITagDocument | null>;
    createTag(this: ITagModel, tag: ITag): Promise<ITagDocument>;
}
