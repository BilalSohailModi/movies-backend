import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';


export const getDatabaseConfig = (): TypeOrmModuleOptions => {

    const envVars = config
    return {
        type: 'postgres',
        host: envVars.DB.HOST || 'localhost',
        port: envVars.DB.PORT as unknown as number,
        username: envVars.DB.USERNAME,
        password: envVars.DB.PASSWORD,
        database: envVars.DB.NAME,
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        synchronize: envVars.DB.SYNCHRONIZE,
        logging: false,
        migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
        migrationsTableName: 'migrations',
    }
};