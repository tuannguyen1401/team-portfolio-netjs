import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Setup EJS views
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('ejs');

  // Parser cho form HTML (urlencoded)
  app.use(express.urlencoded({ extended: true }));

  // Serve static files (uploads)
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
