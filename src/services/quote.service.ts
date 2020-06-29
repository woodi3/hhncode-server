import { DB, IDeleteResponse } from '../database/types';
import { IQuoteDocument, Query } from '../database/quotes/quotes.types';

export default class QuoteService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async getQuotes(query: Query): Promise<IQuoteDocument[]> {
        return await this.db.QuoteModel.getQuotes(query);
    }

    async save(quote: IQuoteDocument): Promise<IQuoteDocument | null> {
        if (quote._id) {
            return await this.db.QuoteModel.updateQuote(quote);
        }
        return await this.db.QuoteModel.createQuote(quote);
    }

    async deleteQuote(query: Query): Promise<IDeleteResponse> {
        return await this.db.QuoteModel.deleteQuote(query);
    }
}
