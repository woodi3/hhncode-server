import { Document, Model, MongooseFilterQuery } from 'mongoose';
export interface IAdmin {
    email: string;
    password: string;
    avatar: number;
}
export interface IAdminDocument extends IAdmin, Document {
    createAdmin: (this: IAdminDocument) => Promise<void>;
}

type Props = '_id' | 'email';

export type Query = MongooseFilterQuery<Pick<IAdminDocument, Props>>;

export interface IAdminModel extends Model<IAdminDocument> {
    getAdmin: (this: IAdminModel, query: Query) => Promise<IAdminDocument | null>;
    createAdmin: (this: IAdminModel, admin: IAdmin) => Promise<IAdminDocument>;
}
