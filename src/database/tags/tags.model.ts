import { model } from 'mongoose';
import { ITagDocument, ITagModel } from './tags.types';
import TagSchema from './tags.schema';
export const TagModel = model<ITagDocument>('tag', TagSchema) as ITagModel;
