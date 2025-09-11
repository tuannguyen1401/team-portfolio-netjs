import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { UPLOAD_DIR, UPLOAD_ROUTE } from './upload/upload.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Setup EJS views
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('ejs');

  // Parser cho form HTML (urlencoded)
  app.use(express.urlencoded({ extended: true }));

  app.enableCors();

  // Serve static files (uploads) using shared config
  app.use(UPLOAD_ROUTE, express.static(UPLOAD_DIR));

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
