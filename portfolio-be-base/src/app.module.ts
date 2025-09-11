import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminModule } from './admin/admin.module';
import { ProjectsController } from './projects.controller';
import { ContactController } from './contacts.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AdminModule,
  ],
  controllers: [AppController, ProjectsController, ContactController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
