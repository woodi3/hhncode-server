import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import ReceiptService from '../services/receipt.service';
import { buildApiPrefix, didDelete, cleanQuery } from '../utils';
import passport from 'passport';
import LogService from '../services/log.service';

let receiptService: ReceiptService;
let logService: LogService;

export const receipt = (app: express.Application, db: DB): void => {
    receiptService = new ReceiptService(db);
    logService = new LogService(db);

    // RECEIPTS GET ROUTES
    app.get(buildApiPrefix('receipts', ''), passport.authenticate('adminJWT', { session: false }), getReceiptsHandler);

    // RECEIPTS POST ROUTES
    // app.post(
    //     buildApiPrefix('receipt', ''),
    //     passport.authenticate('adminJWT', { session: false }),
    //     createReceiptHandler,
    // );

    // RECEIPTS DELETE ROUTES
    app.delete(
        buildApiPrefix('receipt', '/:id'),
        passport.authenticate('adminJWT', { session: false }),
        deleteReceiptHandler,
    );
};

const getReceiptsHandler = async (req: Request, res: Response) => {
    try {
        const { query } = cleanQuery(req.query, false);
        const receipts = await receiptService.getReceipts(query);
        return res.json({ success: true, receipts });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/receipts', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting receipts!` });
    }
};

const createReceiptHandler = async (req: Request, res: Response) => {
    try {
        const receipt = await receiptService.save(req.body);
        return res.json({ success: true, data: receipt });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/receipt', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating receipt!` });
    }
};

const deleteReceiptHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await receiptService.deleteReceipt({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Receipt deleted!` });
        }
        return res.json({ success: false, message: `Receipt not deleted!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/receipt', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting receipt!` });
    }
};
