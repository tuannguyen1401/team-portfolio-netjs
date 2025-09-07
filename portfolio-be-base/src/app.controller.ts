import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('projects')
  async getProjects() {
    let projects = await this.prisma.project.findMany();

     projects = projects.map(project => {
      return {
        ...project,
        image_url: project.image_url ? `${process.env.APP_URL}${project.image_url}` : null,
      };
     });

    return {
      projects: projects,
    };
  }

  @Get('configs')
  async getConfigs() {
    return await this.prisma.config.findMany();
  }
}
