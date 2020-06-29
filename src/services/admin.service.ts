import bcrypt from 'bcrypt';
import { IAdminDocument, IAdmin } from '../database/admins/admins.types';
import { hashPassword, createToken } from '../utils';
import { DB } from '../database/types';
import environment from '../utils/environment';

const ADMIN_KEY = environment.ADMIN_JWT_KEY || 'some_admin_key';

type AdminWithToken = {
    access_token: string;
    admin: IAdminDocument;
};

export default class AdminService {
    db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    /**
     * Creates an admin.
     * @param admin
     */
    async createAdmin(admin: IAdmin): Promise<IAdminDocument> {
        admin.password = await hashPassword(admin.password);
        const newAdmin = await this.db.AdminModel.createAdmin(admin);
        newAdmin.password = '';
        return newAdmin;
    }

    /**
     * Authorize an email/password combination
     * @param {String} email
     * @param {String} password
     */
    async authorize(email: string, password: string): Promise<IAdminDocument | null> {
        const admin = await this.db.AdminModel.getAdmin({ email });
        if (admin) {
            const match = await bcrypt.compare(password, admin.password);
            if (match) {
                admin.password = '';
                return admin;
            }
        }
        return null;
    }

    /**
     * Creates a jwt token for the admin
     * @param admin
     */
    login(admin: IAdminDocument): AdminWithToken {
        const payload = { id: admin._id, sub: admin._id };
        return {
            access_token: createToken(payload, ADMIN_KEY),
            admin,
        };
    }
}
