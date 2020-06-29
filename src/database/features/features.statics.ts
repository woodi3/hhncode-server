import { IFeatureDocument, IFeatureModel, Query, IFeature } from './features.types';
import { IDeleteResponse } from '../types';

export async function getFeature(this: IFeatureModel, query: Query): Promise<IFeatureDocument | null> {
    const record = await this.findOne(query);
    return record;
}

export async function getFeatures(this: IFeatureModel, query: Query): Promise<IFeatureDocument[]> {
    const records = await this.find(query);
    return records;
}

export async function deleteFeature(this: IFeatureModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createFeature(this: IFeatureModel, feature: IFeature): Promise<IFeatureDocument> {
    return await this.create(feature);
}

export async function updateFeature(this: IFeatureModel, feature: IFeatureDocument): Promise<IFeatureDocument | null> {
    return await this.findByIdAndUpdate(feature._id, feature);
}
