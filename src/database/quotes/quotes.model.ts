import { model } from 'mongoose';
import { IQuoteDocument, IQuoteModel } from './quotes.types';
import QuoteSchema from './quotes.schema';
export const QuoteModel = model<IQuoteDocument>('quote', QuoteSchema) as IQuoteModel;
