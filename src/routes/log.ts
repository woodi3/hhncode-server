import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import LogService from '../services/log.service';
import { buildApiPrefix, didDelete } from '../utils';
import passport from 'passport';

let logService: LogService;

export const log = (app: express.Application, db: DB): void => {
    logService = new LogService(db);

    // LOGS GET ROUTES
    app.get(buildApiPrefix('logs', ''), passport.authenticate('adminJWT', { session: false }), getLogsHandler);

    // LOGS POST ROUTES
    app.post(buildApiPrefix('log', ''), createLogHandler);

    // LOGS DELETE ROUTES
    app.delete(buildApiPrefix('log', '/:id'), passport.authenticate('adminJWT', { session: false }), deleteLogHandler);
};

const getLogsHandler = async (_: Request, res: Response) => {
    try {
        const logs = await logService.getLogs();
        return res.json({ success: true, data: logs });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/logs', err.code, 'ERROR');

        return res.json({ success: false, message: `Error getting logs!` });
    }
};

const createLogHandler = async (req: Request, res: Response) => {
    try {
        const { stacktrace, message, api, code, type } = req.body;
        await logService.createLog(stacktrace, message, api, code, type);
        return res.json({ success: true });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/log', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating log!` });
    }
};

const deleteLogHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await logService.deleteLog({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Log deleted!` });
        }
        return res.json({ success: false, message: `Log not deleted!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/log', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting log!` });
    }
};
