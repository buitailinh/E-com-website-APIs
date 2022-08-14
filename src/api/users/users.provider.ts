import { Connection } from 'typeorm';
import { USER_CONST } from './users.constant';
import { User } from './entities/user.entity'
export const userProvider = [
    {
        provide: USER_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION'],
    }
]