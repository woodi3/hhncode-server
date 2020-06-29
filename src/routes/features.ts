import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import FeatureService from '../services/feature.service';
import { buildApiPrefix, didDelete } from '../utils';
import passport from 'passport';
import LogService from '../services/log.service';

let featureService: FeatureService;
let logService: LogService;

export const feature = (app: express.Application, db: DB): void => {
    featureService = new FeatureService(db);
    logService = new LogService(db);

    // FEATURES GET ROUTES
    app.get(buildApiPrefix('features', ''), getFeaturesHandler);

    // FEATURES POST ROUTES
    app.post(
        buildApiPrefix('feature', ''),
        passport.authenticate('adminJWT', { session: false }),
        createFeatureHandler,
    );

    // FEATURES DELETE ROUTES
    app.delete(
        buildApiPrefix('feature', '/:id'),
        passport.authenticate('adminJWT', { session: false }),
        deleteFeatureHandler,
    );
};

const getFeaturesHandler = async (req: Request, res: Response) => {
    try {
        const features = await featureService.getFeatures({});
        return res.json({ success: true, features });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/features', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting features!` });
    }
};

const createFeatureHandler = async (req: Request, res: Response) => {
    try {
        const feature = await featureService.save(req.body);
        return res.json({ success: true, data: feature });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/feature', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating feature!` });
    }
};

const deleteFeatureHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await featureService.deleteFeature({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Feature deleted!` });
        }
        return res.json({ success: false, message: `Feature not deleted!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/feature', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting feature!` });
    }
};
