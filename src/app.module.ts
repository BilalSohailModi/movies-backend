import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { MovieModule } from './modules/movie/movie.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { getPinoConfig } from './config/logger.config';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60,
        limit: 100,
      }
    ]),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    LoggerModule.forRoot(getPinoConfig()),
    AuthModule,
    MovieModule,
    UserModule,
  ],

  controllers: [AppController,],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },],
})
export class AppModule { }
