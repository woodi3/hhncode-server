import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export type Item = 'donation';

export interface IReceipt {
    email: string;
    amount: number; // in cents
    item: Item;
    deleted: boolean;
}

export interface IReceiptDocument extends IReceipt, Document {
    saveReceipt: (this: IReceiptDocument) => Promise<IReceiptDocument>;
}

type Props = '_id' | 'email' | 'amount' | 'item' | 'deleted';

export type Query = MongooseFilterQuery<Pick<IReceiptDocument, Props>>;

export interface IReceiptModel extends Model<IReceiptDocument> {
    getReceipt: (this: IReceiptModel, query: Query) => Promise<IReceiptDocument | null>;
    getReceipts: (this: IReceiptModel, query: Query) => Promise<IReceiptDocument[]>;
    deleteReceipt: (this: IReceiptModel, query: Query) => Promise<IDeleteResponse>;
    updateReceipt(this: IReceiptModel, receipt: IReceiptDocument): Promise<IReceiptDocument | null>;
    createReceipt(this: IReceiptModel, receipt: IReceipt): Promise<IReceiptDocument>;
}
