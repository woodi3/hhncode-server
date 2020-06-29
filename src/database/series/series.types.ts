import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IPostDocument } from '../posts/posts.types';
import { ITagDocument } from '../tags/tags.types';
import { ISeriesMeta, IDeleteResponse } from '../types';

export interface ISeries {
    posts: IPostDocument[];
    tags: ITagDocument[];
    name: string;
    description: string;
    isActive: boolean;
    totalViews: number;
    meta: ISeriesMeta;
}

export interface ISeriesDocument extends ISeries, Document {
    saveSeries: (this: ISeriesDocument) => Promise<ISeriesDocument>;
}

type Props = '_id' | 'name' | 'isActive';

export type Query = MongooseFilterQuery<Pick<ISeriesDocument, Props>>;

export interface ISeriesModel extends Model<ISeriesDocument> {
    getSeries: (this: ISeriesModel, query: Query) => Promise<ISeriesDocument[]>;
    deleteSeries: (this: ISeriesModel, query: Query) => Promise<IDeleteResponse>;
    updateSeries(this: ISeriesModel, series: ISeriesDocument): Promise<ISeriesDocument | null>;
    createSeries(this: ISeriesModel, series: ISeries): Promise<ISeriesDocument>;
}
