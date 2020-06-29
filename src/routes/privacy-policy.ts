import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import LogService from '../services/log.service';
import { buildApiPrefix } from '../utils';
import { PRIVACY_POLICY } from '../database/privacy-policy';

let logService: LogService;

export const privacyPolicy = (app: express.Application, db: DB): void => {
    logService = new LogService(db);

    // PRIVACY POLICY GET ROUTES
    app.get(buildApiPrefix('privacy-policy', ''), getPrivacyPolicy);
};

const getPrivacyPolicy = async (_: Request, res: Response) => {
    try {
        return res.json({ success: true, privacyPolicy: PRIVACY_POLICY });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/privacy-policy', err.code, 'ERROR');

        return res.json({ success: false, message: `Error getting privacy policy!` });
    }
};
