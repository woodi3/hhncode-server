import { ICommentDocument, Query } from '../database/comments/comments.types';
import { DB, IDeleteResponse } from '../database/types';

export default class CommentService {
    db: DB;
    constructor(db: DB) {
        this.db = db;
    }

    /**
     * Saves a comment
     * @param comment ICommentDocument
     */
    async save(comment: ICommentDocument): Promise<ICommentDocument | null> {
        if (comment._id) {
            return await this.db.CommentModel.updateComment(comment);
        }

        return await this.db.CommentModel.createComment(comment);
    }
    /**
     * Returns all comments
     */
    async getComments(query: Query): Promise<ICommentDocument[]> {
        return await this.db.CommentModel.getComments(query);
    }

    /**
     * Returns the first comment that matches the query
     * @param {string} id
     * @returns {Promise<Comment>}
     */
    async getComment(query: Query): Promise<ICommentDocument | null> {
        return await this.db.CommentModel.getComment(query);
    }

    /**
     * Deletes the first comment that matches the specified id
     * @param {string} id
     */
    async deleteComment(query: Query): Promise<IDeleteResponse> {
        return await this.db.CommentModel.deleteComment(query);
    }
}
