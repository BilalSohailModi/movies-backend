import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { JWTAuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { PagintionQuery } from 'src/untils/utilities.dto';
import { UserEntity } from '../user/entities/user.entity';

@UseGuards(JWTAuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }



  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @Req() req: Request) {
    return this.movieService.create(createMovieDto, req.session.user as UserEntity);
  }


  @Get()
  findAll(@Query() query: PagintionQuery) {
    return this.movieService.findAll(query);
  }



  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const response = await this.movieService.update(id, updateMovieDto);
    return { message: "Updated succesfully", response }
  }

}
