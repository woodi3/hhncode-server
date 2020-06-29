import { DB, IDeleteResponse } from '../database/types';
import { ILogDocument, Query, LogType, ILog } from '../database/logs/logs.types';

export default class LogService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    async createLog(stacktrace: string, message: string, api: string, code: string, type: LogType): Promise<void> {
        // TODO
        // send email when log is created
        await this.create({
            stacktrace,
            message,
            api,
            code,
            type,
        });
    }

    async getLogs(): Promise<ILogDocument[]> {
        return await this.db.LogModel.getLogs({});
    }

    /**
     * Gets the logs by array.
     * @param {string[]} logIds
     */
    async getLogsByIds(logIds: string[]): Promise<ILogDocument[]> {
        return await this.db.LogModel.getLogs({ _id: { $in: logIds } });
    }

    async save(log: ILogDocument): Promise<ILogDocument> {
        // TODO
        // send email when log is created
        return await log.saveLog();
    }

    async deleteLog(query: Query): Promise<IDeleteResponse> {
        return await this.db.LogModel.deleteLog(query);
    }

    private async create(log: ILog): Promise<ILogDocument> {
        return await this.db.LogModel.create(log);
    }
}
