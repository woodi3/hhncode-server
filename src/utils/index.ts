import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IDeleteResponse } from '../database/types';
import * as core from 'express-serve-static-core';

type Payload = string | Record<string, unknown> | Buffer;

export const createToken = (payload: Payload, signStr: string): string => {
    const token = jwt.sign(payload, signStr);
    return 'Bearer ' + token;
};

type Entity =
    | 'admin'
    | 'log'
    | 'logs'
    | 'post'
    | 'posts'
    | 'tag'
    | 'tags'
    | 'user'
    | 'users'
    | 'series'
    | 'comments'
    | 'comment'
    | 'report'
    | 'feature'
    | 'features'
    | 'privacy-policy'
    | 'music'
    | 'quote'
    | 'quotes'
    | 'receipt'
    | 'receipts';
export const buildApiPrefix = (entity: Entity, url: string): string => {
    return `/api/${entity}${url}`;
};

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const didDelete = (item: IDeleteResponse): boolean => item.deletedCount !== undefined && item.deletedCount > 0;

export const cleanQuery = (query: any, createOr: boolean): { query: any; or: any } => {
    let or;
    const q: core.ParamsDictionary = {};

    // create object with query
    Object.keys(query).forEach((k) => {
        if (query[k] !== '') {
            q[k] = query[k];
        }
    });

    if (createOr) {
        // create mongoose $or query
        or = Object.keys(q).map((k) => {
            return {
                // use regex for partial matchings
                [`${k}`]: {
                    $regex: query[k],
                    $options: 'i',
                },
            };
        });
    }
    return { query: q, or };
};

export * from './file-upload';
