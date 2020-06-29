import { model } from 'mongoose';
import { ISeriesModel, ISeriesDocument } from './series.types';
import SeriesSchema from './series.schema';
export const SeriesModel = model<ISeriesDocument>('series', SeriesSchema) as ISeriesModel;
