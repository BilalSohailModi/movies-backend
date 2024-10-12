import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './src/config/database.config';

const config: any = {
    ...getDatabaseConfig(),
};
export default new DataSource(config);