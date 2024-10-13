import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CustomHttpException } from 'src/untils/exceptionHandler';
import { getPaginated } from 'src/untils/utilities';
import { iPagintionQuery } from 'src/untils/utilities.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}
  async create(createMovieDto: CreateMovieDto, createdBy: UserEntity) {
    const movie = this.movieRepository.create({ ...createMovieDto, createdBy });
    await this.movieRepository.save(movie).catch((err) => {
      throw new CustomHttpException(err.message, HttpStatus.BAD_REQUEST);
    });
    return movie;
  }

  async findAll({ offset, limit, getAll }: iPagintionQuery) {
    const fetchAll = getAll == 'true';
    const options: FindManyOptions<MovieEntity> = {
      where: { deletedAt: null },
      order: { createdAt: 'DESC' }, // Use 'DESC' for descending order
      skip: offset,
      take: limit,
    };
    if (fetchAll) {
      delete options.skip;
      delete options.take;
    }
    const [movie, total] = await this.movieRepository.findAndCount(options);
    return getPaginated({
      data: movie,
      offset: fetchAll ? -1 : offset,
      limit: fetchAll ? -1 : limit,
      total,
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const result = await this.movieRepository.update(id, updateMovieDto);
    return result;
  }
}
