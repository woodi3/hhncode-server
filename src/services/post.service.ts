import { IPostDocument, Query } from '../database/posts/posts.types';
import { DB, IDeleteResponse } from '../database/types';
import TagService from './tag.service';

type MetricKey = 'totalViews' | 'totalReads';

export default class PostService {
    db: DB;
    tagService: TagService;

    constructor(db: DB, ts: TagService) {
        this.db = db;
        this.tagService = ts;
    }

    /**
     * Saves a post
     * @param post IPostDocument
     */
    async save(post: IPostDocument): Promise<IPostDocument | null> {
        if (post._id) {
            return await this.db.PostModel.updatePost(post);
        }

        return await this.db.PostModel.createPost(post);
    }
    /**
     * Returns all posts
     */
    async getPosts(query: Query, limit?: number): Promise<IPostDocument[]> {
        const posts = await this.db.PostModel.getPosts(query, limit);
        for (let i = 0; i < posts.length; i++) {
            let p = posts[i];
            p = await this.setTags(p);
        }
        return posts;
    }

    /**
     * Returns all published posts
     */
    async getPostsForClient(query: Query, limit?: number): Promise<IPostDocument[]> {
        if (query.isDraft === undefined) {
            query.isDraft = false;
        }
        return await this.getPosts(query, limit);
    }

    /**
     * Returns the first post that matches the specified id
     * @param {string} id
     * @returns {Promise<Post>}
     */
    async getPost(query: Query): Promise<IPostDocument | null> {
        let post = await this.db.PostModel.getPost(query);
        if (post) {
            post = await this.setTags(post);
        }
        return post;
    }

    async getPostForClient(query: Query): Promise<IPostDocument | null> {
        let post = await this.db.PostModel.getPost(query);
        if (post) {
            if (post.isDraft) {
                return null;
            }
            post = await this.setTags(post);
        }
        return post;
    }

    /**
     * Deletes the first post that matches the specified id
     * @param {string} id
     */
    async deletePost(query: Query): Promise<IDeleteResponse> {
        return await this.db.PostModel.deletePost(query);
    }

    async updateMetrics(query: Query, metricKey: MetricKey): Promise<IPostDocument | null> {
        const post = await this.getPostForClient(query);
        if (post) {
            let metric = post.get(metricKey);
            if (metric === undefined || metric === null) {
                metric = 0;
            }
            metric++;
            post.set(metricKey, metric);
            return await post.save();
        }
        return post;
    }

    private async setTags(post: IPostDocument): Promise<IPostDocument> {
        if (this.tagService) {
            const tagIds = post.tags.map((t) => {
                if (typeof t === 'string') {
                    return t;
                }
                return t._id;
            });
            post.tags = await this.tagService.getTagsByIds(tagIds);
        }
        return post;
    }
}
