import { Schema } from 'mongoose';
import { getFeature, getFeatures, deleteFeature, createFeature, updateFeature } from './features.statics';
import { saveFeature } from './features.methods';

const FeatureSchema = new Schema(
    {
        label: String,
        description: String,
        enabled: Boolean,
        deleted: Boolean,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

FeatureSchema.statics.getFeature = getFeature;
FeatureSchema.statics.getFeatures = getFeatures;
FeatureSchema.statics.deleteFeature = deleteFeature;
FeatureSchema.statics.createFeature = createFeature;
FeatureSchema.statics.updateFeature = updateFeature;
FeatureSchema.methods.saveFeature = saveFeature;

export default FeatureSchema;
