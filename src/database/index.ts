import Mongoose from 'mongoose';
import { AdminModel } from './admins/admins.model';
import { PostModel } from './posts/posts.model';
import { TagModel } from './tags/tags.model';
import { UserModel } from './users/users.model';
import { LogModel } from './logs/logs.model';
import { SeriesModel } from './series/series.model';
import { CommentModel } from './comments/comments.model';
import { FeatureModel } from './features/features.model';
import { QuoteModel } from './quotes/quotes.model';
import { ReceiptModel } from './receipts/receipts.model';
import { DB } from './types';
import environment from '../utils/environment';

let database: Mongoose.Connection;
export const connect = (): Promise<DB> => {
    return new Promise((resolve) => {
        const uri = environment.DB_CONN_STR || '';
        if (!database) {
            Mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
            database = Mongoose.connection;
            database.once('open', () => {
                console.log('Connected to database');
                resolve({
                    AdminModel,
                    PostModel,
                    TagModel,
                    UserModel,
                    LogModel,
                    SeriesModel,
                    CommentModel,
                    FeatureModel,
                    QuoteModel,
                    ReceiptModel,
                });
            });
            database.on('error', () => {
                console.log('Error connecting to database');
            });
        }
    });
};

export const disconnect = (): void => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
