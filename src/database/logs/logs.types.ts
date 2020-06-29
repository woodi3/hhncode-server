import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export type LogType = 'DEBUG' | 'WARN' | 'ERROR';

export interface ILog {
    stacktrace: string;
    message: string;
    api: string;
    code: string;
    type: LogType;
}
export interface ILogDocument extends ILog, Document {
    saveLog: (this: ILogDocument) => Promise<ILogDocument>;
}

type Props = '_id' | 'type' | 'code';

export type Query = MongooseFilterQuery<Pick<ILogDocument, Props>>;

export interface ILogModel extends Model<ILogDocument> {
    getLog: (this: ILogModel, query: Query) => Promise<ILogDocument | null>;
    getLogs: (this: ILogModel, query: Query) => Promise<ILogDocument[]>;
    deleteLog: (this: ILogModel, query: Query) => Promise<IDeleteResponse>;
    createLog: (this: ILogModel, log: ILog) => Promise<ILogDocument>;
}
