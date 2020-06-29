import { Document, Model, MongooseFilterQuery } from 'mongoose';
import { IDeleteResponse } from '../types';

export interface IUser {
    email: string;
    name: string;
    password: string;
    notify: boolean;
    isAdmin: boolean;
    bookmarks: string[];
    role: 'user' | 'subscriber';
}
export interface IUserDocument extends IUser, Document {
    saveUser: (this: IUserDocument) => Promise<IUserDocument>;
    sameEmail: (this: IUserDocument) => Promise<IUserDocument[]>;
}

type Props = '_id' | 'name' | 'role';

export type Query = MongooseFilterQuery<Pick<IUserDocument, Props>>;

export interface IUserModel extends Model<IUserDocument> {
    getUser: (this: IUserModel, query: Query, keepPass: boolean) => Promise<IUserDocument | null>;
    getUsers: (this: IUserModel, query: Query) => Promise<IUserDocument[]>;
    deleteUser: (this: IUserModel, query: Query) => Promise<IDeleteResponse>;
    updateUser(this: IUserModel, user: IUserDocument): Promise<IUserDocument | null>;
    createUser(this: IUserModel, user: IUser): Promise<IUserDocument>;
}
