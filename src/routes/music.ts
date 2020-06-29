import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DB } from '../database/types';
import LogService from '../services/log.service';
import { buildApiPrefix } from '../utils';
import environment from '../utils/environment';

type Payload = {
    iss: string;
    exp: number;
    iat: number;
};

let logService: LogService;

const APPLE_MUSIC_KEY = environment.APPLE_MUSIC_KEY;
const APPLE_MUSIC_KID = environment.APPLE_MUSIC_KID;
const APPLE_MUSIC_TEAMID = environment.APPLE_MUSIC_TEAMID;
const JWT_ALGORITHM = 'ES256';

export const music = (app: express.Application, db: DB): void => {
    logService = new LogService(db);

    // MUSIC GET ROUTES
    app.get(buildApiPrefix('music', '/token'), createAppleMusicToken);
};

const createAppleMusicToken = async (_: Request, res: Response) => {
    try {
        const currTime = Math.floor(new Date().getTime() / 1000);
        const threeMonthsAhead = currTime + 7776000;
        const payload: Payload = {
            iss: APPLE_MUSIC_TEAMID,
            exp: threeMonthsAhead,
            iat: currTime,
        };
        const options: jwt.SignOptions = {
            algorithm: JWT_ALGORITHM,
            header: {
                alg: JWT_ALGORITHM,
                kid: APPLE_MUSIC_KID,
            },
        };
        const token = createToken(payload, APPLE_MUSIC_KEY, options);

        return res.json({ success: true, token });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/music/authenticate', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating music token!` });
    }
};

function createToken(payload: Payload, privateKey: string, options: jwt.SignOptions) {
    const token = jwt.sign(payload, privateKey, options);
    return token;
}
