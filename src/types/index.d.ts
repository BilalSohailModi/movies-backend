import { UserEntity } from 'src/modules/user/entities/user.entity';

declare module 'express' {
    export interface Request {
        session: {
            user?: UserEntity;
        };
    }
}