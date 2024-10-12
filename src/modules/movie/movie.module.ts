import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { S3Service } from 'src/config/s3.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService, S3Service],
  exports: [MovieService],
})
export class MovieModule { }
