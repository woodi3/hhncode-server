import dotenv from 'dotenv';

dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    DB_CONN_STR: process.env.DB_CONN_STR || 'mongodb://localhost:27017/hhncode',
    ADMIN_JWT_KEY: process.env.ADMIN_JWT_KEY || 'admin_key',
    USER_JWT_KEY: process.env.USER_JWT_KEY || 'user_key',
    CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    STRIPE_KEY: process.env.STRIPE_KEY || 'setup stripe',
    APPLE_MUSIC_KEY: (process.env.APPLE_MUSIC_KEY || '').replace(/\\n/g, '\n'),
    APPLE_MUSIC_KID: process.env.APPLE_MUSIC_KID || '',
    APPLE_MUSIC_TEAMID: process.env.APPLE_MUSIC_TEAMID || '',
    FROM_EMAIL: process.env.FROM_EMAIL || 'woodawilliam@gmail.com',
};
