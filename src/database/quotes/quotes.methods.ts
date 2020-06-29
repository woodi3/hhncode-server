import { IQuoteDocument } from './quotes.types';

export async function saveQuote(this: IQuoteDocument): Promise<IQuoteDocument> {
    return await this.save();
}
