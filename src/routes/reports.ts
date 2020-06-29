import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import LogService from '../services/log.service';
import { buildApiPrefix } from '../utils';
import CommentService from '../services/comment.service';
import EmailService, { IEmail, EmailType } from '../services/email.service';
import environment from '../utils/environment';

let logService: LogService;
let commentService: CommentService;
let emailService: EmailService;

export const report = (app: express.Application, db: DB): void => {
    logService = new LogService(db);
    commentService = new CommentService(db);
    emailService = new EmailService();

    // REPORT POST ROUTES
    app.post(buildApiPrefix('report', ''), createReportHandler);
};

const createReportHandler = async (req: Request, res: Response) => {
    try {
        const { name, emailAddress, message, commentId } = req.body;

        const comment = await commentService.getComment({ _id: commentId });
        if (comment) {
            comment.reported = true;
            await comment.save();
            const email: IEmail = {
                to: emailAddress,
                from: environment.FROM_EMAIL,
                title: 'Some title', //TODO
                body: 'Some body', //TODO
                type: EmailType.CommentReport,
            };
            emailService.sendEmail(email);
        }

        return res.json({ success: true });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/report', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating report!` });
    }
};
