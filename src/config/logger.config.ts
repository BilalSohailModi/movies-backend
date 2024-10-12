// pino.config.ts

import { IncomingMessage, ServerResponse } from 'http';
import { LevelWithSilent, LoggerOptions, TransportSingleOptions } from 'pino';
import { startTime } from 'pino-http';


export const getPinoConfig = (): { pinoHttp: PinoHttpOptions } => {

    return {
        pinoHttp: {
            level: 'info', // Default log level
            customLogLevel(req: IncomingMessage, res: ServerResponse, err?: Error) {
                if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
                if (res.statusCode >= 500 || err) return 'error';
                return 'info';
            },
            customProps(req: IncomingMessage, res: ServerResponse) {
                const responseTime = Date.now() - res[startTime];
                return {
                    LOG: `[${new Date().toLocaleString('en-US', {})}] ${req?.connection?.remoteAddress} ${req.method?.toUpperCase()} ${req.url}, ${res.statusCode}, ${responseTime}ms ${req.headers['user-agent']}`,
                };
            },
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname,req,res,responseTime',
                },
            },
        },
    };


}


interface PinoHttpOptions extends LoggerOptions {
    customLogLevel?: (req: IncomingMessage, res: ServerResponse, err?: Error) => LevelWithSilent;
    customProps?: (req: IncomingMessage, res: ServerResponse) => { [key: string]: any };
    transport?: TransportSingleOptions;
}