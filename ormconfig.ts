import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getDatabaseConfig } from './src/config';

const config: TypeOrmModuleOptions = getDatabaseConfig()
export default config;