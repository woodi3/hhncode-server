import { Schema } from 'mongoose';
import { getReceipt, getReceipts, deleteReceipt, createReceipt, updateReceipt } from './receipts.statics';
import { saveReceipt } from './receipts.methods';

const ReceiptSchema = new Schema(
    {
        email: String,
        amount: Number, // in cents
        item: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

ReceiptSchema.statics.getReceipt = getReceipt;
ReceiptSchema.statics.getReceipts = getReceipts;
ReceiptSchema.statics.deleteReceipt = deleteReceipt;
ReceiptSchema.statics.createReceipt = createReceipt;
ReceiptSchema.statics.updateReceipt = updateReceipt;
ReceiptSchema.methods.saveReceipt = saveReceipt;

export default ReceiptSchema;
