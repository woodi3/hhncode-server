import { Query, IUserModel, IUserDocument, IUser } from './users.types';
import { IDeleteResponse } from '../types';

const projections = {
    password: 0,
};

export async function getUsers(this: IUserModel, query: Query): Promise<IUserDocument[]> {
    return await this.find(query, projections);
}
export async function getUser(this: IUserModel, query: Query, keepPass: boolean): Promise<IUserDocument | null> {
    return await this.findOne(query, keepPass ? {} : projections);
}
export async function deleteUser(this: IUserModel, query: Query): Promise<IDeleteResponse> {
    return await this.deleteOne(query);
}

export async function createUser(this: IUserModel, user: IUser): Promise<IUserDocument> {
    return await this.create(user);
}

export async function updateUser(this: IUserModel, user: IUserDocument): Promise<IUserDocument | null> {
    return await this.findByIdAndUpdate(user._id, user, { new: true, projection: projections });
}
