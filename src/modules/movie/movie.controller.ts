import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, GetMovieById, UpdateMovieDto } from './dto/movie.dto';
import { JWTAuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { PagintionQuery } from 'src/untils/utilities.dto';
import { UserEntity } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import Multer from 'multer';
import { S3Service } from 'src/config/s3.config';
import { ThrottlerGuard } from '@nestjs/throttler';
@UseGuards(ThrottlerGuard, JWTAuthGuard,)
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly s3Service: S3Service,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  async create(
    @UploadedFile() file: Multer.File,
    @Body() createMovieDto: CreateMovieDto,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const poster = await this.s3Service.uploadImage(file);

    return this.movieService.create(
      { ...createMovieDto, poster: poster.Location },
      req.session.user as UserEntity,
    );
  }

  @Get()
  findAll(@Query() query: PagintionQuery, @Req() req: Request) {
    return this.movieService.findAll(query, req.session.user);
  }

  @Get(':id')
  findById(@Param() params: GetMovieById) {
    return this.movieService.findById(params.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('poster'))
  async update(
    @UploadedFile() file: Multer.File,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    if (file) {
      const poster = await this.s3Service.uploadImage(file);
      updateMovieDto.poster = poster.Location;
    }

    const response = await this.movieService.update(id, updateMovieDto);
    return { message: 'Updated succesfully', response };
  }
}
