import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomHttpException } from 'src/untils/exceptionHandler';
import { SignUpUserDto, iJWTpayload, signInValidation } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { iUser } from '../user/dto/user.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async signin(signinData: signInValidation): Promise<UserEntity> {
        const user = await this.userService.getByEmail(signinData.email)
        if (!user) throw new CustomHttpException('invalid credentials', HttpStatus.UNAUTHORIZED)
        const valid = await user.comparePassword(signinData.password)
        if (!valid) throw new CustomHttpException('invalid credentials', HttpStatus.UNAUTHORIZED)
        return user
    }

    signJWT(user: iUser, rememberMe: boolean) {
        const payload: iJWTpayload = { email: user.email, id: user.id, name: `${user.firstName} ${user.lastName}`, sub: user.id }
        const expiresIn = rememberMe ? '30d' : '1h'
        return this.jwtService.sign(payload, { expiresIn })
    }
    async verifyJWT(jwt: string) {
        try {
            const data = await this.jwtService.verifyAsync(jwt) as undefined | iJWTpayload
            if (!data)
                throw new CustomHttpException('Authentication required', HttpStatus.UNAUTHORIZED)
            const user = await this.userService.getByEmail(data.email)
            if (!user)
                throw new CustomHttpException('Authentication required', HttpStatus.UNAUTHORIZED)
            return { user }

        } catch (error) {
            throw new CustomHttpException('Authentication required', HttpStatus.UNAUTHORIZED)
        }

    }
}
