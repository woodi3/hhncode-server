import { model } from 'mongoose';
import { ILogDocument, ILogModel } from './logs.types';
import LogSchema from './logs.schema';
export const LogModel = model<ILogDocument>('log', LogSchema) as ILogModel;
