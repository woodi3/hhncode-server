import { IQuoteDocument, IQuoteModel, Query, IQuote } from './quotes.types';
import { IDeleteResponse } from '../types';

export async function getQuote(this: IQuoteModel, query: Query): Promise<IQuoteDocument | null> {
    const record = await this.findOne(query);
    return record;
}

export async function getQuotes(this: IQuoteModel, query: Query): Promise<IQuoteDocument[]> {
    const records = await this.find(query);
    return records;
}

export async function deleteQuote(this: IQuoteModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createQuote(this: IQuoteModel, quote: IQuote): Promise<IQuoteDocument> {
    return await this.create(quote);
}

export async function updateQuote(this: IQuoteModel, quote: IQuoteDocument): Promise<IQuoteDocument | null> {
    return await this.findByIdAndUpdate(quote._id, quote);
}
