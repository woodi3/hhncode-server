import { Query, ILogModel, ILogDocument, ILog } from './logs.types';
import { IDeleteResponse } from '../types';

export async function getLogs(this: ILogModel, query: Query): Promise<ILogDocument[]> {
    return await this.find(query);
}
export async function getLog(this: ILogModel, query: Query): Promise<ILogDocument | null> {
    return await this.findOne(query);
}
export async function deleteLog(this: ILogModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createLog(this: ILogModel, log: ILog): Promise<ILogDocument> {
    return await this.create(log);
}
