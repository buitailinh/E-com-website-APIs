import { v4 } from 'uuid';
import { redis } from './redis';

export const confirmEmailLink = async (userEmail: string): Promise<any> => {
    const id = v4();

    await redis.set(id, userEmail, "EX", 60 * 60 * 15);

    return `${process.env.BACKEND_HOST}/user/confirm/${id}`;
};