import { IUserDocument } from './users.types';
import { Document } from 'mongoose';

export async function saveUser(this: IUserDocument): Promise<IUserDocument> {
    return await this.save();
}

export async function sameEmail(this: IUserDocument): Promise<Document[]> {
    return await this.model('user').find({ email: this.email });
}
