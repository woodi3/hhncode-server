import { IAdminModel } from './admins/admins.types';
import { IPostModel } from './posts/posts.types';
import { ITagModel } from './tags/tags.types';
import { IUserModel } from './users/users.types';
import { ILogModel } from './logs/logs.types';
import { ISeriesModel } from './series/series.types';
import { ICommentModel } from './comments/comments.types';
import { IFeatureModel } from './features/features.types';
import { IQuoteModel } from './quotes/quotes.types';
import { IReceiptModel } from './receipts/receipts.types';

export type DB = {
    AdminModel: IAdminModel;
    PostModel: IPostModel;
    TagModel: ITagModel;
    UserModel: IUserModel;
    LogModel: ILogModel;
    SeriesModel: ISeriesModel;
    CommentModel: ICommentModel;
    FeatureModel: IFeatureModel;
    QuoteModel: IQuoteModel;
    ReceiptModel: IReceiptModel;
};

export interface IMeta {
    subtitle: string;
}

export type IPostMeta = IMeta;

export type ISeriesMeta = IMeta;

export interface IDeleteResponse {
    n?: number;
    ok?: number;
    deletedCount?: number;
}
