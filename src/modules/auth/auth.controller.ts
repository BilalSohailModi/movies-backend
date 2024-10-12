import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, signInValidation } from './auth.dto';
// import { JwtService } from '@nestjs/jwt';
import { JWTAuthGuard } from './auth.guard';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { iUser } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post('/signin')
  async signIn(@Body() signinData: signInValidation,) {
    const user = await this.authService.signin(signinData)
    return this.signJWT(user)
  }

  @Post('/signup')
  async signUp(@Body() signUpData: SignUpUserDto,) {
    const user = await this.userService.signUp(signUpData)
    return this.signJWT(user)
  }

  signJWT(user: iUser) {
    const access_token = this.authService.signJWT(user)
    return {
      data: user,
      access_token,
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    if (req.session.user) return {
      data: req.session.user,
    }
  }
}
