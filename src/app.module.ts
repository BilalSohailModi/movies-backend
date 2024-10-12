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

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    LoggerModule.forRoot(getPinoConfig()),
    AuthModule,
    MovieModule,
    UserModule,
  ],

  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
