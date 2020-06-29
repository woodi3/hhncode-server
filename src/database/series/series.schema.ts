import { Schema } from 'mongoose';
import { getSeries, deleteSeries, createSeries, updateSeries } from './series.statics';

const SeriesSchema = new Schema(
    {
        name: String,
        description: String,
        content: String,
        posts: [Object],
        meta: Object,
        tags: [Object],
        isActive: Boolean,
        totalViews: Number,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

SeriesSchema.statics.getSeries = getSeries;
SeriesSchema.statics.deleteSeries = deleteSeries;
SeriesSchema.statics.createSeries = createSeries;
SeriesSchema.statics.updateSeries = updateSeries;

export default SeriesSchema;
