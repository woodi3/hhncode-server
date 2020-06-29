import express, { Request, Response } from 'express';
// import request from 'request';
import { DB } from '../database/types';
import UserService from '../services/user.service';
import { buildApiPrefix, didDelete } from '../utils';
import environment from '../utils/environment';
import passport from 'passport';
import Stripe from 'stripe';
import { IUserDocument, Query } from '../database/users/users.types';
import LogService from '../services/log.service';
import EmailService, { IEmail, EmailType } from '../services/email.service';
import { IReceiptDocument, IReceipt } from '../database/receipts/receipts.types';
import ReceiptService from '../services/receipt.service';

const CHARGE = 399;

const stripe = new Stripe(environment.STRIPE_KEY, {
    apiVersion: '2020-03-02',
});

let userService: UserService;
let logService: LogService;
let emailService: EmailService;
let receiptService: ReceiptService;

export const user = (app: express.Application, db: DB): void => {
    userService = new UserService(db);
    logService = new LogService(db);
    emailService = new EmailService();
    receiptService = new ReceiptService(db);

    // USERS GET ROUTES
    app.get(
        buildApiPrefix('user', '/checkToken'),
        passport.authenticate('userJWT', { session: false }),
        checkTokenHandler,
    );

    app.get(buildApiPrefix('user', ''), passport.authenticate('userJWT', { session: false }), getUserHandler);

    app.get(buildApiPrefix('users', ''), passport.authenticate('adminJWT', { session: false }), getUsersHandler);

    app.get(buildApiPrefix('user', '/charge'), chargeHandler);

    // USERS POST ROUTES
    app.post(buildApiPrefix('user', '/login'), loginHandler);

    // client register
    app.post(buildApiPrefix('user', '/register'), registerHandler);

    app.post(buildApiPrefix('user', '/subscribe'), subscribeHandler);

    // admin create user
    app.post(buildApiPrefix('user', ''), passport.authenticate('adminJWT', { session: false }), saveHandler);

    // validate password
    app.post(
        buildApiPrefix('user', '/validate'),
        passport.authenticate('userJWT', { session: false }),
        validatePasswordHandler,
    );

    app.post(buildApiPrefix('user', '/receipt'), receiptHandler);

    app.post(buildApiPrefix('user', '/unsubscribe'), unsubscribeHandler);

    // USERS PATCH ROUTES
    app.patch(buildApiPrefix('user', ''), passport.authenticate('userJWT', { session: false }), updateHandler);

    // client delete account
    app.delete(buildApiPrefix('user', '/client'), passport.authenticate('userJWT', { session: false }), deleteHandler);

    // admin delete user account
    app.delete(buildApiPrefix('user', '/admin'), passport.authenticate('adminJWT', { session: false }), deleteHandler);
};

const checkTokenHandler = (req: Request, res: Response) => {
    return res.json({ success: true, user: req.user });
};

const getUserHandler = async (req: Request, res: Response) => {
    try {
        const reqUser = req.user as IUserDocument;
        const user = await userService.findOneWithQuery({ _id: reqUser._id }, false);
        if (user) {
            return res.json({ success: true, user });
        }
        return res.json({ success: false });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/user', err.code, 'ERROR');
        return res.json({ success: false });
    }
};

const getUsersHandler = async (_: Request, res: Response) => {
    try {
        const users = await userService.findAll();
        return res.json({ success: true, users });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/users', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting users!` });
    }
};

const loginHandler = async (req: Request, res: Response) => {
    // log user in
    try {
        const { email, password } = req.body;
        const user = await userService.authorize(email, password);
        if (!user) {
            res.status(401);
            res.send('Unauthorized request!');
            return;
        }
        const result = userService.login(user);
        return res.json({ success: true, access_token: result.access_token, user: result.user });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/login', err.code, 'ERROR');
        return res.json({ success: false, message: `Error authorizing user!` });
    }
};

const registerHandler = async (req: Request, res: Response) => {
    // register user
    try {
        req.body.role = 'user';
        const user = await userService.save(req.body);
        if (user) {
            const email: IEmail = {
                body: 'Some body', // TODO
                title: 'Some title', // TODO
                from: environment.FROM_EMAIL,
                to: user.email,
                type: EmailType.UserRegistration,
            };
            emailService.sendEmail(email);

            const result = userService.login(user);
            return res.json({ success: true, access_token: result.access_token, user: result.user });
        }
        logService.createLog('N/A', 'User was null when registering', 'POST /api/user/register', 'N/A', 'WARN');
        return res.json({ success: false, message: `Error creating user!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/register', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating user!` });
    }
};

const subscribeHandler = async (req: Request, res: Response) => {
    // subscribe user
    try {
        // TODO send an email
        req.body.role = 'subscriber';
        const user = await userService.save(req.body);
        if (user) {
            const email: IEmail = {
                body: 'Some body', // TODO
                title: 'Some title', // TODO
                from: environment.FROM_EMAIL,
                to: user.email,
                type: EmailType.UserSubscription,
            };
            emailService.sendEmail(email);
            return res.json({ success: true });
        }
        logService.createLog('N/A', 'User was null when registering', 'POST /api/user/register', 'N/A', 'WARN');
        return res.json({ success: false, message: `Error creating user!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/subscribe', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating user!` });
    }
};

const saveHandler = async (req: Request, res: Response) => {
    // admin create user
    try {
        const user = await userService.save(req.body);
        return res.json({ success: true, user: user });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating user!` });
    }
};

const updateHandler = async (req: Request, res: Response) => {
    // update user
    try {
        const user = await userService.save(req.body);

        if (user) {
            const email: IEmail = {
                body: 'Some body', // TODO
                title: 'Some title', // TODO
                from: environment.FROM_EMAIL,
                to: user.email,
                type: EmailType.UserAccountChange,
            };
            emailService.sendEmail(email);
        }

        return res.json({ success: true, user: user });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'PATCH /api/user', err.code, 'ERROR');
        return res.json({ success: false, message: `Error updating user!` });
    }
};

const validatePasswordHandler = async (req: Request, res: Response) => {
    try {
        const result = await userService.validatePassword(req.body.email, req.body.password);
        return res.json({
            success: result,
        });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/validate', err.code, 'ERROR');
        return res.json({ success: false, message: `Error validating password!` });
    }
};

const chargeHandler = async (_: Request, res: Response) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: CHARGE,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
        });
        return res.json({ success: true, paymentIntent });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/charge', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating payment intent` });
    }
};

const receiptHandler = async (req: Request, res: Response) => {
    try {
        const { receipt_email: email, amount, description } = req.body.data.object;
        const isTest = description === '(created by Stripe CLI)';
        const receipt: IReceipt = {
            email,
            amount,
            item: 'donation',
            deleted: false,
        };
        if (isTest || (email && amount)) {
            // send email thanking user for donation
            const newReceipt = await receiptService.save(<IReceiptDocument>receipt);
            if (newReceipt) {
                const emailToSend: IEmail = {
                    body: 'Some body', // TODO
                    title: 'Some title', // TODO
                    from: environment.FROM_EMAIL,
                    to: email || 'test@gmail.com',
                    type: EmailType.UserDontationReceipt,
                };
                emailService.sendEmail(emailToSend);
            }
        }

        return res.json({ success: true });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/receipt', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating receipt` });
    }
};

const deleteHandler = async (req: Request, res: Response) => {
    try {
        if (Object.keys(req.query).length > 0) {
            const user = await userService.findOneWithQuery(req.query, false);
            const deleteResult = await userService.deleteOne(req.query);
            if (didDelete(deleteResult) && user) {
                const email: IEmail = {
                    body: 'Some body', // TODO
                    title: 'Some title', // TODO
                    from: environment.FROM_EMAIL,
                    to: user.email,
                    type: EmailType.UserAccountDeletion,
                };
                emailService.sendEmail(email);
                return res.json({ success: true, message: `Deleted user successfully.` });
            }
        }
        return res.json({ success: false, message: `Failed to delete user.` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/user', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting user` });
    }
};

const unsubscribeHandler = async (req: Request, res: Response) => {
    try {
        if (req.body.email) {
            const query: Query = { email: req.body.email, role: 'subscriber' };
            const deleteResult = await userService.deleteOne(query);
            if (didDelete(deleteResult)) {
                const email: IEmail = {
                    body: 'Some body', // TODO
                    title: 'Some title', // TODO
                    from: environment.FROM_EMAIL,
                    to: req.body.email,
                    type: EmailType.UserAccountDeletion,
                };
                emailService.sendEmail(email);
                return res.json({ success: true, message: `Unsubscribed user successfully.` });
            }
        }
        return res.json({ success: false, message: `Failed to unsubscribe user.` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/user/unsubscribe', err.code, 'ERROR');
        return res.json({ success: false, message: `Error unsubscribing user` });
    }
};
