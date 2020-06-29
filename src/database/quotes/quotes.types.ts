import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export interface IQuote {
    author: string;
    active: boolean;
    imgUrl: string;
    text: string;
}

export interface IQuoteDocument extends IQuote, Document {
    saveQuote: (this: IQuoteDocument) => Promise<IQuoteDocument>;
}

type Props = '_id' | 'text' | 'author' | 'active';

export type Query = MongooseFilterQuery<Pick<IQuoteDocument, Props>>;

export interface IQuoteModel extends Model<IQuoteDocument> {
    getQuote: (this: IQuoteModel, query: Query) => Promise<IQuoteDocument | null>;
    getQuotes: (this: IQuoteModel, query: Query) => Promise<IQuoteDocument[]>;
    deleteQuote: (this: IQuoteModel, query: Query) => Promise<IDeleteResponse>;
    updateQuote(this: IQuoteModel, quote: IQuoteDocument): Promise<IQuoteDocument | null>;
    createQuote(this: IQuoteModel, quote: IQuote): Promise<IQuoteDocument>;
}
