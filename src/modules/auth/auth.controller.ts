import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, signInValidation } from './auth.dto';
// import { JwtService } from '@nestjs/jwt';
import { JWTAuthGuard } from './auth.guard';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { iUser } from '../user/dto/user.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post('/signin')
  async signIn(@Body() signinData: signInValidation,) {
    const user = await this.authService.signin(signinData)
    return this.signJWT(user, signinData.rememberMe)
  }

  @Post('/signup')
  async signUp(@Body() signUpData: SignUpUserDto,) {
    const user = await this.userService.signUp(signUpData)
    return this.signJWT(user, true)
  }

  signJWT(user: iUser, rememberMe: boolean) {
    const access_token = this.authService.signJWT(user, rememberMe)
    return {
      data: this.omitPassword(user),
      access_token,
    }
  }

  omitPassword(user: iUser) {
    return { ...user, password: undefined }
  }

  @UseGuards(JWTAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    if (req.session.user) return {
      data: this.omitPassword(req.session.user),
    }
  }
}
