import { DB, IDeleteResponse } from '../database/types';
import { IFeatureDocument, Query } from '../database/features/features.types';

export default class FeatureService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async getFeatures(query: Query): Promise<IFeatureDocument[]> {
        if (query.deleted === undefined) {
            query.deleted = false;
        }
        return await this.db.FeatureModel.getFeatures(query);
    }

    async save(feature: IFeatureDocument): Promise<IFeatureDocument | null> {
        if (feature._id) {
            return await this.db.FeatureModel.updateFeature(feature);
        }
        return await this.db.FeatureModel.createFeature(feature);
    }

    async deleteFeature(query: Query): Promise<IDeleteResponse> {
        return await this.db.FeatureModel.deleteFeature(query);
    }
}
