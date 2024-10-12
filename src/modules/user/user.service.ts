import { HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryFailedError, Repository } from 'typeorm';
import { CustomHttpException } from 'src/untils/exceptionHandler';
import { getPaginated } from 'src/untils/utilities';
import { iPagintionQuery } from 'src/untils/utilities.dto';
import { SignUpUserDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {

  }

  async signUp(createUserDto: SignUpUserDto) {
    const user = this.userRepository.create(createUserDto)
    await this.userRepository.save(user).catch((error) => {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        // 23505 is the error code for unique violation in PostgreSQL
        throw new CustomHttpException('Email is already in use', HttpStatus.BAD_REQUEST);
      }
      throw new CustomHttpException(error.message, HttpStatus.BAD_REQUEST)
    })
    return user
  }


  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email, isActive: true } })
  }
}
