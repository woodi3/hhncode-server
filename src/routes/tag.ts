import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import TagService from '../services/tag.service';
import { buildApiPrefix, didDelete } from '../utils';
import passport from 'passport';
import LogService from '../services/log.service';

let tagService: TagService;
let logService: LogService;

export const tag = (app: express.Application, db: DB): void => {
    tagService = new TagService(db);
    logService = new LogService(db);

    // TAGS GET ROUTES
    app.get(buildApiPrefix('tags', ''), getTagsHandler);

    // TAGS POST ROUTES
    app.post(buildApiPrefix('tag', ''), passport.authenticate('adminJWT', { session: false }), createTagHandler);

    // TAGS DELETE ROUTES
    app.delete(buildApiPrefix('tag', '/:id'), passport.authenticate('adminJWT', { session: false }), deleteTagHandler);
};

const getTagsHandler = async (req: Request, res: Response) => {
    try {
        const tags = await tagService.getTags();
        return res.json({ success: true, tags });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/tags', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting tags!` });
    }
};

const createTagHandler = async (req: Request, res: Response) => {
    try {
        const tag = await tagService.save(req.body);
        return res.json({ success: true, data: tag });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/tag', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating tag!` });
    }
};

const deleteTagHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await tagService.deleteTag({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Tag deleted!` });
        }
        return res.json({ success: false, message: `Tag not deleted!` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/tag', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting tag!` });
    }
};
