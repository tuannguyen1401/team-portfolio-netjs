import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly prisma: PrismaService) {}

  protected handleImageUrl(image_url: string) : string | null {
    return `${process.env.APP_URL}${image_url}`;
  }

  private stackToArray(input: any): string[] {
    return input.split(',').map(s => s.trim()).filter(Boolean);
  }

  @Get()
  async findAll() {
    const projects = await this.prisma.project.findMany({
      orderBy: { id: 'desc' },
    });

    return { 
      data: projects.map(project => ({
        ...project,
        image_url: project.image_url ? this.handleImageUrl(project.image_url) : null,
        stack_name: this.stackToArray(project.stack_name)
      }))
    };
  }

  @Get('featured')
  async findFeatured() {
    const projects = await this.prisma.project.findMany({
      where: { is_feautured: true },
      orderBy: { id: 'desc' },
      take: 5
    });

    return { 
      projects: projects.map(project => ({
        ...project,
        image_url: project.image_url ? this.handleImageUrl(project.image_url) : null,
        stack_name: this.stackToArray(project.stack_name)
      }))
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.prisma.project.findUnique({ where: { id: parseInt(id) } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return { data: project };
  }
}


