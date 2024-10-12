import { config as dotenvConfig } from 'dotenv';
import * as Joi from 'joi';
import { ENVIRONMENTS } from './app.constants';

dotenvConfig();
const configValidation = () => {
    const envVarsSchema = Joi.object()
        .keys({
            NODE_ENV: Joi.string().valid(ENVIRONMENTS.PRODUCTION, ENVIRONMENTS.DEVELOPMENT, 'test').required(),
            DB_HOST: Joi.string().required(),
            DB_PORT: Joi.number().default(3000),
            DB_USERNAME: Joi.string().required(),
            DB_PASSWORD: Joi.string().required().allow(''),
            DB_NAME: Joi.string().required(),
            SESSION_SECRET: Joi.string().required(),
            CORS_ORIGIN: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            DB_SYNCHRONIZE: Joi.string().valid('on', 'off').required(),
        })
        .unknown();

    const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    return envVars
}
const config = configValidation()
export default {
    NODE_ENV: config.NODE_ENV,
    DB: {
        HOST: config.DB_HOST,
        PORT: config.DB_PORT,
        USERNAME: config.DB_USERNAME,
        PASSWORD: config.DB_PASSWORD,
        NAME: config.DB_NAME,
        SYNCHRONIZE: config.DB_SYNCHRONIZE == 'on' ? true : false
    },
    SECRETS: {
        SESSION: config.SESSION_SECRET,
        JWT: config.JWT_SECRET,
    },
    CORS_ORIGIN: config.CORS_ORIGIN,
}