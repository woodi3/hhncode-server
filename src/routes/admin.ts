import express, { Response, Request } from 'express';
import { buildApiPrefix } from '../utils';
import passport from 'passport';
import { DB } from '../database/types';
import AdminService from '../services/admin.service';
import LogService from '../services/log.service';

let adminService: AdminService;
let logService: LogService;

export const admin = (app: express.Application, db: DB): void => {
    adminService = new AdminService(db);
    logService = new LogService(db);

    // GET ROUTES
    app.get(
        buildApiPrefix('admin', '/checkToken'),
        passport.authenticate('adminJWT', { session: false }),
        checkTokenHandler,
    );

    // ADMIN POST ROUTES
    app.post(buildApiPrefix('admin', '/login'), loginHandler);
    app.post(buildApiPrefix('admin', '/register'), registerHandler);
};

const checkTokenHandler = (_: Request, res: Response) => {
    return res.json({ success: true });
};

const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const admin = await adminService.authorize(email, password);
        if (!admin) {
            res.status(401);
            res.send('Unauthorized request!');
            return;
        }
        const result = adminService.login(admin);
        return res.json({ success: true, access_token: result.access_token, admin: result.admin });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/admin/login', err.code, 'ERROR');
        return res.json({ success: false, message: `Error authorizing admin!` });
    }
};

const registerHandler = async (req: Request, res: Response) => {
    // register admin
    try {
        const admin = await adminService.createAdmin(req.body);
        const result = adminService.login(admin);
        return res.json({ success: true, result });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/admin/register', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating admin!` });
    }
};
