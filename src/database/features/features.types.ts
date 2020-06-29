import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export interface IFeature {
    label: string;
    description: string;
    enabled: boolean;
    deleted: boolean;
}

export interface IFeatureDocument extends IFeature, Document {
    saveFeature: (this: IFeatureDocument) => Promise<IFeatureDocument>;
}

type Props = '_id' | 'label' | 'enabled' | 'deleted';

export type Query = MongooseFilterQuery<Pick<IFeatureDocument, Props>>;

export interface IFeatureModel extends Model<IFeatureDocument> {
    getFeature: (this: IFeatureModel, query: Query) => Promise<IFeatureDocument | null>;
    getFeatures: (this: IFeatureModel, query: Query) => Promise<IFeatureDocument[]>;
    deleteFeature: (this: IFeatureModel, query: Query) => Promise<IDeleteResponse>;
    updateFeature(this: IFeatureModel, feature: IFeatureDocument): Promise<IFeatureDocument | null>;
    createFeature(this: IFeatureModel, feature: IFeature): Promise<IFeatureDocument>;
}
