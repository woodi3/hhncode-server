import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { PassportStatic } from 'passport';
import environment from './utils/environment';
import { IUserModel } from './database/users/users.types';
import { IAdminModel } from './database/admins/admins.types';

const adminOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment.ADMIN_JWT_KEY || 'some_admin_key',
};
const userOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment.USER_JWT_KEY || 'some_admin_key',
};

export default function (passport: PassportStatic, UserModel: IUserModel, AdminModel: IAdminModel): void {
    const handleAdmin = async (jwt_payload: any, done: any) => {
        try {
            const admin = await AdminModel.getAdmin({ _id: jwt_payload.id });
            if (admin) {
                return done(null, admin);
            }
        } catch (err) {
            return done(err);
        }
        return done(null, false);
    };

    const handleUser = async (jwt_payload: any, done: any) => {
        try {
            const user = await UserModel.getUser({ _id: jwt_payload.id }, false);
            if (user) {
                return done(null, user);
            }
        } catch (err) {
            return done(err);
        }
        return done(null, false);
    };

    passport.use('adminJWT', new JwtStrategy(adminOpts, handleAdmin));
    passport.use('userJWT', new JwtStrategy(userOpts, handleUser));
}
