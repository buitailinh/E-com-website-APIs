import { config } from 'dotenv';
config();

export const JWT_CONFIG = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE_TIME,
};

export const JWT_REFRESH_CONFIG = {
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: process.env.REFRESH_JWT_EXPIRE_TIME,

};

export const MYSQL_CONFIG = {
    hostMaster: process.env.MYSQL_MASTER_HOST || '',
    hostSlaves: process.env.MYSQL_SLAVES_HOST || '',
    host: process.env.MYSQL_HOST || '',
    username: process.env.MYSQL_USERNAME || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE_NAME || '',
    port: +process.env.MYSQL_PORT || 3306,
};

export const REDIS_CONFIG = {
    uri: process.env.CACHE_URI,
    day: 1, // cache 1 day, fix production can change this value or change key
};

export const NODE_ENV = process.env.NODE_ENV;
