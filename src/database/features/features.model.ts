import { model } from 'mongoose';
import { IFeatureDocument, IFeatureModel } from './features.types';
import FeatureSchema from './features.schema';
export const FeatureModel = model<IFeatureDocument>('feature', FeatureSchema) as IFeatureModel;
