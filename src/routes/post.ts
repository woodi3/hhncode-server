import express, { Request, Response } from 'express';
import { DB } from '../database/types';
import TagService from '../services/tag.service';
import PostService from '../services/post.service';
import { buildApiPrefix, FileUploadHelper, didDelete, cleanQuery } from '../utils';
import passport from 'passport';
import multiparty from 'multiparty';
import LogService from '../services/log.service';
import EmailService, { IEmail, EmailType } from '../services/email.service';
import UserService from '../services/user.service';
import environment from '../utils/environment';

let postService: PostService;
let tagService: TagService;
let logService: LogService;
let emailService: EmailService;
let userService: UserService;

export const post = (app: express.Application, db: DB): void => {
    logService = new LogService(db);
    tagService = new TagService(db);
    postService = new PostService(db, tagService);
    userService = new UserService(db);
    emailService = new EmailService();

    // POSTS GET ROUTES
    app.get(
        buildApiPrefix('posts', ''),
        passport.authenticate('adminJWT', { session: false }),
        getPostsForAdminHandler,
    );
    app.get(buildApiPrefix('posts', '/client'), getPostsForClientHandler);
    app.get(
        buildApiPrefix('post', '/admin'),
        passport.authenticate('adminJWT', { session: false }),
        getPostForAdminHandler,
    );
    app.get(buildApiPrefix('post', '/client'), getPostForClientHandler);
    app.get(buildApiPrefix('posts', '/search'), searchPostHandler);

    // POSTS POST ROUTES
    app.post(buildApiPrefix('post', ''), passport.authenticate('adminJWT', { session: false }), createPostHandler);
    app.post(buildApiPrefix('post', '/metrics'), metricHandler);
    app.post(buildApiPrefix('posts', '/get/batch'), getBatchPostsHandler);
    app.post(buildApiPrefix('post', '/upload'), passport.authenticate('adminJWT', { session: false }), uploadHandler);

    // POSTS DELETE ROUTES
    app.delete(buildApiPrefix('post', '/:id'), passport.authenticate('adminJWT', { session: false }), deleteHandler);
};

const getPostsForAdminHandler = async (_: Request, res: Response) => {
    try {
        const posts = await postService.getPosts({});
        return res.json({ success: true, posts });
    } catch (err) {
        // TODO Log error
        logService.createLog(err.stack, err.message, 'GET /api/posts', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting posts!` });
    }
};

const getPostsForClientHandler = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : undefined;
        const or = req.query.or === undefined ? false : true;
        delete req.query.or;
        delete req.query.limit;
        const { query } = cleanQuery(req.query, or);

        const posts = await postService.getPostsForClient(query, limit);
        return res.json({ success: true, posts });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/posts/client', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting posts for client!` });
    }
};

const getBatchPostsHandler = async (req: Request, res: Response) => {
    try {
        const limit = 1000;
        const postIds = req.body.postIds;
        const query = {
            _id: {
                $in: postIds,
            },
        };
        const posts = await postService.getPostsForClient(query, limit);
        return res.json({ success: true, posts });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/posts/get/batch', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting batch posts for client!` });
    }
};

const getPostForAdminHandler = async (req: Request, res: Response) => {
    try {
        const post = await postService.getPost(req.query);
        return res.json({ success: true, post });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/post/admin/:id', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting post with id: ${req.params.id}!` });
    }
};

const getPostForClientHandler = async (req: Request, res: Response) => {
    try {
        const post = await postService.getPostForClient(req.query);
        return res.json({ success: true, post });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/post/client', err.code, 'ERROR');
        return res.json({ success: false, message: `Error getting post` });
    }
};

const searchPostHandler = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : undefined;
        delete req.query.limit;
        const { or } = cleanQuery(req.query, true);
        // use empty object if no query params
        const dbQuery = or.length > 0 ? { $or: or } : {};
        const posts = await postService.getPostsForClient(dbQuery, limit);
        return res.json({ success: true, posts });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'GET /api/posts/search', err.code, 'ERROR');
        return res.json({ success: false, message: `Error searching posts` });
    }
};

const createPostHandler = async (req: Request, res: Response) => {
    try {
        const isNewPost = req.body._id === undefined;
        const post = await postService.save(req.body);

        if (isNewPost && post && !post.isDraft) {
            // TODO send email to all users and subscribers
            // only send to users that have `notify` set to true
            const users = await userService.findAll({ notify: true });
            if (users.length > 0) {
                users.forEach((user) => {
                    const email: IEmail = {
                        from: environment.FROM_EMAIL,
                        to: user.email,
                        body: 'Some body', //TODO
                        title: 'Some title', //TODO
                        type: EmailType.NewPost,
                        post,
                    };
                    emailService.sendEmail(email);
                });
            }
        }

        return res.json({ success: true, data: post });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/post', err.code, 'ERROR');
        return res.json({ success: false, message: `Error creating post!` });
    }
};

const metricHandler = async (req: Request, res: Response) => {
    try {
        const post = await postService.updateMetrics(req.body.query, req.body.metricKey);
        return res.json({ success: true, post });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'POST /api/post/metrics', err.code, 'ERROR');
        return res.json({ success: false, message: `Error updating metric for post!` });
    }
};

const uploadHandler = (req: Request, res: Response) => {
    const form = new multiparty.Form();

    const imgHandler = async (_: any, __: any, files: any) => {
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
            logService.createLog(err.stack, err.message, 'POST /api/post/upload', err.code, 'ERROR');
            return res.json({ success: false, message: `Error uploading image.` });
        }
    };

    form.parse(req, imgHandler);
};

const deleteHandler = async (req: Request, res: Response) => {
    try {
        const deleteResult = await postService.deletePost({ _id: req.params.id });
        if (didDelete(deleteResult)) {
            return res.json({ success: true, message: `Deleted post successfully.` });
        }
        return res.json({ success: false, message: `Failed to delete post.` });
    } catch (err) {
        logService.createLog(err.stack, err.message, 'DELETE /api/post/:id', err.code, 'ERROR');
        return res.json({ success: false, message: `Error deleting post` });
    }
};
