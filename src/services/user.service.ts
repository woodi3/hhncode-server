import bcrypt from 'bcrypt';
import { DB, IDeleteResponse } from '../database/types';
import { Query, IUserDocument } from '../database/users/users.types';
import { createToken, hashPassword } from '../utils';
import environment from '../utils/environment';

const USER_JWT_KEY = environment.USER_JWT_KEY || 'some_user_key';
const MAX_PASS_LEN = 6;

type UserWithToken = {
    access_token: string;
    user: IUserDocument;
};

export default class UserService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    /**
     * Find all users
     */
    async findAll(query: Query = {}): Promise<IUserDocument[]> {
        return await this.db.UserModel.find(query, { password: 0 });
    }

    /**
     * Finds first user that satisfies the query
     * @param {Query} query
     */
    async findOneWithQuery(query: Query, keepPass: boolean): Promise<IUserDocument | null> {
        return await this.db.UserModel.getUser(query, keepPass);
    }

    /**
     * Calls findOneWithQuery, refer to jsdoc comments
     * @param {Query} query
     */
    async findOne(query: Query): Promise<IUserDocument | null> {
        return await this.findOneWithQuery(query, true);
    }

    /**
     * Creates new user
     * @param {IUserDocument} user
     */
    async save(user: IUserDocument): Promise<IUserDocument | null> {
        if (user._id) {
            if (user.password) {
                if (user.password !== '' && user.password.length >= MAX_PASS_LEN) {
                    user.password = await hashPassword(user.password);
                } else {
                    throw new Error('Password is invalid when changing it');
                }
            }
            return await this.db.UserModel.updateUser(user);
        }

        // query if email is already in use
        const existingUser = await this.findOne({ email: user.email });

        if (!existingUser) {
            if (user.password) {
                user.password = await hashPassword(user.password);
            }

            return await this.db.UserModel.createUser(user);
        }

        return null;
    }

    /**
     * Changes the password for user
     * @param {string} email
     * @param {string} newHash
     */
    async validatePassword(email: string, password: string): Promise<boolean> {
        const user = await this.db.UserModel.getUser({ email }, true);
        if (user) {
            return await bcrypt.compare(password, user.password);
        }
        return false;
    }

    /**
     * Deletes first user object that matches specified id
     * @param {string} id
     */
    async deleteOne(query: Query): Promise<IDeleteResponse> {
        return await this.db.UserModel.deleteUser(query);
    }

    /**
     * Authorize an email/password combination
     * @param {String} email
     * @param {String} password
     */
    async authorize(email: string, password: string): Promise<IUserDocument | null> {
        const user = await this.db.UserModel.getUser({ email, role: 'user' }, true);
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                user.password = '';
                return user;
            }
        }
        return null;
    }

    /**
     * Creates a jwt token for the subscriber
     * @param subscriber
     */
    login(user: IUserDocument): UserWithToken {
        const payload = { id: user._id, sub: user._id };
        return {
            access_token: createToken(payload, USER_JWT_KEY),
            user,
        };
    }
}
