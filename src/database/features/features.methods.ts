import { IFeatureDocument } from './features.types';

export async function saveFeature(this: IFeatureDocument): Promise<IFeatureDocument> {
    return await this.save();
}
