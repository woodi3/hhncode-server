import { IReceiptDocument } from './receipts.types';

export async function saveReceipt(this: IReceiptDocument): Promise<IReceiptDocument> {
    return await this.save();
}
