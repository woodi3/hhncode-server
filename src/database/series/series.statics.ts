import { ISeriesDocument, ISeriesModel, Query, ISeries } from './series.types';
import { IDeleteResponse } from '../types';

export async function getSeries(this: ISeriesModel, query: Query): Promise<ISeriesDocument[]> {
    const records = await this.find(query);
    return records;
}

export async function deleteSeries(this: ISeriesModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createSeries(this: ISeriesModel, series: ISeries): Promise<ISeriesDocument> {
    return await this.create(series);
}

export async function updateSeries(this: ISeriesModel, series: ISeriesDocument): Promise<ISeriesDocument | null> {
    return await this.findByIdAndUpdate(series._id, series);
}
