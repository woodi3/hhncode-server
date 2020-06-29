import { ISeriesDocument, Query } from '../database/series/series.types';
import { DB, IDeleteResponse } from '../database/types';
import TagService from './tag.service';
import PostService from './post.service';

export default class SeriesService {
    db: DB;
    tagService: TagService;
    postService: PostService;

    constructor(db: DB, ts: TagService, ps: PostService) {
        this.db = db;
        this.tagService = ts;
        this.postService = ps;
    }

    /**
     * Saves a series
     * @param series ISeriesDocument
     */
    async save(series: ISeriesDocument): Promise<ISeriesDocument | null> {
        if (series._id) {
            return await this.db.SeriesModel.updateSeries(series);
        }

        return await this.db.SeriesModel.createSeries(series);
    }
    /**
     * Returns series based on query. If querying 1 series, the first result
     * is the data.
     */
    async getSeries(query: Query): Promise<ISeriesDocument[]> {
        const series = await this.db.SeriesModel.getSeries(query);
        for (let i = 0; i < series.length; i++) {
            let s = series[i];
            s = await this.setPosts(s);
            s = await this.setTags(s);
        }
        return series;
    }

    /**
     * Returns all published series
     */
    async getSeriesForClient(query: Query): Promise<ISeriesDocument[]> {
        if (query.isActive === undefined) {
            query.isActive = true;
        }
        return await this.getSeries(query);
    }

    /**
     * Deletes the first series that matches the specified id
     * @param {string} id
     */
    async deleteSeries(query: Query): Promise<IDeleteResponse> {
        return await this.db.SeriesModel.deleteSeries(query);
    }

    private async setTags(series: ISeriesDocument): Promise<ISeriesDocument> {
        if (this.tagService) {
            const tagIds = series.tags.map((t) => {
                if (typeof t === 'string') {
                    return t;
                }
                return t._id;
            });
            series.tags = await this.tagService.getTagsByIds(tagIds);
        }
        return series;
    }

    private async setPosts(series: ISeriesDocument): Promise<ISeriesDocument> {
        if (this.postService) {
            const postIds = series.posts.map((t) => {
                if (typeof t === 'string') {
                    return t;
                }
                return t._id;
            });
            series.posts = await this.postService.getPosts({ _id: { $in: postIds } });
        }
        return series;
    }
}
