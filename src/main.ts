import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import config from './config/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: config.CORS_ORIGIN.split(','),
      credentials: true
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
