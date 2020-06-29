import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import TagService from '../services/tag.service';
import PostService from '../services/post.service';
import SeriesService from '../services/series.service';
import { buildApiPrefix, FileUploadHelper, didDelete } from '../utils';
import passport from 'passport';
import multiparty from 'multiparty';
import LogService from '../services/log.service';

let postService: PostService;
let tagService: TagService;
let logService: LogService;
let seriesService: SeriesService;

export const series = (app: express.Application, db: DB): void => {
    logService = new LogService(db);
    tagService = new TagService(db);
    postService = new PostService(db, tagService);
    seriesService = new SeriesService(db, tagService, postService);

    // GET SERIES ROUTES
    app.get(
        buildApiPrefix('series', ''),
        passport.authenticate('adminJWT', { session: false }),
        getSeriesForAdminHandler,
    );
    app.get(buildApiPrefix('series', '/client'), getSeriesForClientHandler);
    app.get(
        buildApiPrefix('series', '/admin/:id'),
        passport.authenticate('adminJWT', { session: false }),
        getSeriesForAdminHandler,
    );
    app.get(buildApiPrefix('series', '/client/:id'), getSeriesForClientHandler);

    // POST SERIES ROUTES
    app.post(buildApiPrefix('series', ''), passport.authenticate('adminJWT', { session: false }), createSeriesHandler);
    app.post(buildApiPrefix('series', '/upload'), passport.authenticate('adminJWT', { session: false }), uploadHandler);

    // DELETE SERIES ROUTES
    app.delete(buildApiPrefix('series', '/:id'), passport.authenticate('adminJWT', { session: false }), deleteHandler);
};

const getSeriesForAdminHandler = async (req: Request, res: Response) => {
    try {
        const series = await seriesService.getSeries(req.query);
        return res.json({ success: true, series });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/series', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting series!` });
    }
};

const getSeriesForClientHandler = async (req: Request, res: Response) => {
    try {
        const series = await seriesService.getSeriesForClient(req.query);
        return res.json({ success: true, series });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/series/client', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting series for client!` });
    }
};

const createSeriesHandler = async (req: Request, res: Response) => {
    try {
        const series = await seriesService.save(req.body);
        return res.json({ success: true, series });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/series', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating series!` });
    }
};

const uploadHandler = (req: Request, res: Response) => {
    const form = new multiparty.Form();

    const imgHandler = async (_: Error, __: any = null, files: any) => {
        try {
            const result = await FileUploadHelper.upload(files.file[0]);
            return res.json({
                success: true,
                image: {
                    width: result.width,
                    height: result.height,
                    url: result.secure_url,
                },
            });
        } catch (err) {
            logService.createLog(err.stack, err.message, 'POST /api/series/upload', err.code, 'ERROR');
            return res.json({ success: false, message: `Error uploading image.` });
        }
    };

    form.parse(req, imgHandler);
};

const deleteHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await seriesService.deleteSeries({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Deleted series successfully.` });
        }
        return res.json({ success: false, message: `Failed to delete series.` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/series/:id', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting series` });
    }
};
