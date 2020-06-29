import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import { buildApiPrefix, didDelete } from '../utils';
import passport from 'passport';
import LogService from '../services/log.service';
import CommentService from '../services/comment.service';
import { IUserDocument } from '../database/users/users.types';

let commentService: CommentService;
let logService: LogService;

export const comment = (app: express.Application, db: DB): void => {
    logService = new LogService(db);
    commentService = new CommentService(db);

    // COMMENTS GET ROUTES
    app.get(buildApiPrefix('comments', ''), getCommentsHandler);

    // COMMENTS POST ROUTES
    app.post(buildApiPrefix('comment', ''), passport.authenticate('userJWT', { session: false }), createCommentHandler);

    // COMMENTS PATCH ROUTES
    app.patch(buildApiPrefix('comment', ''), passport.authenticate('userJWT', { session: false }), updateHandler);

    // COMMENTS DELETE ROUTES
    app.delete(buildApiPrefix('comment', '/:id'), passport.authenticate('userJWT', { session: false }), deleteHandler);
};

const getCommentsHandler = async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getComments(req.query);
        return res.json({ success: true, comments });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/comments', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting comments` });
    }
};

const updateHandler = async (req: Request, res: Response) => {
    // update comment
    try {
        const reqUser = req.user as IUserDocument;
        if (reqUser._id === req.body._id) {
            const comment = await commentService.save(req.body);
            return res.json({ success: true, comment });
        }
        return res.json({ success: false });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'PATCH /api/comment', err.code, 'ERROR');
        return res.json({ success: false, message: `Error updating comment!` });
    }
};

const createCommentHandler = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.save(req.body);
        return res.json({ success: true, comment });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/comment', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating comment!` });
    }
};

const deleteHandler = async (req: Request, res: Response) => {
    try {
        const reqUser = req.user as IUserDocument;
        const deleteResult = await commentService.deleteComment({ _id: req.params.id, userId: reqUser._id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Deleted comment successfully.` });
        }
        return res.json({ success: false, message: `Failed to delete comment.` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/comment', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting comment` });
    }
};
