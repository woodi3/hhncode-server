import { DB, IDeleteResponse } from '../database/types';
import { IReceiptDocument, Query } from '../database/receipts/receipts.types';

export default class ReceiptService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async getReceipts(query: Query): Promise<IReceiptDocument[]> {
        return await this.db.ReceiptModel.getReceipts(query);
    }

    /**
     * Gets the receipts for a post.
     */
    async getReceiptsByIds(receiptIds: string[]): Promise<IReceiptDocument[]> {
        return await this.db.ReceiptModel.getReceipts({ _id: { $in: receiptIds } });
    }

    async save(receipt: IReceiptDocument): Promise<IReceiptDocument | null> {
        if (receipt._id) {
            return await this.db.ReceiptModel.updateReceipt(receipt);
        }
        return await this.db.ReceiptModel.createReceipt(receipt);
    }

    async deleteReceipt(query: Query): Promise<IDeleteResponse> {
        return await this.db.ReceiptModel.deleteReceipt(query);
    }
}
