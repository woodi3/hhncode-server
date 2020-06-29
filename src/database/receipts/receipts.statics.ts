import { IReceiptDocument, IReceiptModel, Query, IReceipt } from './receipts.types';
import { IDeleteResponse } from '../types';

export async function getReceipt(this: IReceiptModel, query: Query): Promise<IReceiptDocument | null> {
    const record = await this.findOne(query);
    return record;
}

export async function getReceipts(this: IReceiptModel, query: Query): Promise<IReceiptDocument[]> {
    const records = await this.find(query);
    return records;
}

export async function deleteReceipt(this: IReceiptModel, query: Query): Promise<IDeleteResponse> {
    const result: IDeleteResponse = {
        deletedCount: undefined,
        n: undefined,
        ok: undefined,
    };
    const receipt = await this.getReceipt(query);
    if (receipt) {
        receipt.deleted = true;
        await receipt.save();
        result.deletedCount = 1;
        result.n = 1;
        result.ok = 1;
    }
    return result;
}

export async function createReceipt(this: IReceiptModel, receipt: IReceipt): Promise<IReceiptDocument> {
    return await this.create(receipt);
}

export async function updateReceipt(this: IReceiptModel, receipt: IReceiptDocument): Promise<IReceiptDocument | null> {
    return await this.findByIdAndUpdate(receipt._id, receipt);
}
