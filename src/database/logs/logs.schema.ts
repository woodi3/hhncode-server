import { Schema } from 'mongoose';
import { getLog, getLogs, deleteLog, createLog } from './logs.statics';
import { saveLog } from './logs.methods';
const LogSchema = new Schema(
    {
        stacktrace: String,
        message: String,
        type: String,
        api: String,
        code: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

LogSchema.statics.getLog = getLog;
LogSchema.statics.getLogs = getLogs;
LogSchema.statics.deleteLog = deleteLog;
LogSchema.statics.createLog = createLog;
LogSchema.methods.saveLog = saveLog;

export default LogSchema;
