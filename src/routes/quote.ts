import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import QuoteService from '../services/quote.service';
import { buildApiPrefix, didDelete, cleanQuery } from '../utils';
import passport from 'passport';
import LogService from '../services/log.service';

let quoteService: QuoteService;
let logService: LogService;

export const quote = (app: express.Application, db: DB): void => {
    quoteService = new QuoteService(db);
    logService = new LogService(db);

    // QUOTES GET ROUTES
    app.get(buildApiPrefix('quotes', ''), getQuotesHandler);

    // QUOTES POST ROUTES
    app.post(buildApiPrefix('quote', ''), passport.authenticate('adminJWT', { session: false }), createQuoteHandler);

    // QUOTES DELETE ROUTES
    app.delete(
        buildApiPrefix('quote', '/:id'),
        passport.authenticate('adminJWT', { session: false }),
        deleteQuoteHandler,
    );
};

const getQuotesHandler = async (req: Request, res: Response) => {
    try {
        const { query } = cleanQuery(req.query, false);
        const quotes = await quoteService.getQuotes(query);
        return res.json({ success: true, quotes });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/quotes', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting quotes!` });
    }
};

const createQuoteHandler = async (req: Request, res: Response) => {
    try {
        const quote = await quoteService.save(req.body);
        return res.json({ success: true, data: quote });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/quote', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating quote!` });
    }
};

const deleteQuoteHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await quoteService.deleteQuote({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Quote deleted!` });
        }
        return res.json({ success: false, message: `Quote not deleted!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/quote', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting quote!` });
    }
};
