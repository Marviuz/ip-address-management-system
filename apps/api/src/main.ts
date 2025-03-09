import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.set('query parser', 'extended');
  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
