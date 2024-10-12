import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from 'src/config/config';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({ global: true, secret: config.SECRETS.JWT, signOptions: { expiresIn: '7d' } }),
    UserModule,
    MovieModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
