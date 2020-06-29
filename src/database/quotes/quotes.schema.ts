import { Schema } from 'mongoose';
import { getQuote, getQuotes, deleteQuote, createQuote, updateQuote } from './quotes.statics';
import { saveQuote } from './quotes.methods';

const QuoteSchema = new Schema(
    {
        text: String,
        author: String,
        active: Boolean,
        imgUrl: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

QuoteSchema.statics.getQuote = getQuote;
QuoteSchema.statics.getQuotes = getQuotes;
QuoteSchema.statics.deleteQuote = deleteQuote;
QuoteSchema.statics.createQuote = createQuote;
QuoteSchema.statics.updateQuote = updateQuote;
QuoteSchema.methods.saveQuote = saveQuote;

export default QuoteSchema;
