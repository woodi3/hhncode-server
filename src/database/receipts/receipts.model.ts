import { model } from 'mongoose';
import { IReceiptDocument, IReceiptModel } from './receipts.types';
import ReceiptSchema from './receipts.schema';
export const ReceiptModel = model<IReceiptDocument>('receipt', ReceiptSchema) as IReceiptModel;
