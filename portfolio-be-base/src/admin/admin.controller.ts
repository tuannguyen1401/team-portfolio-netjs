import { Controller, Get, Post, Body, Param, Put, Delete, Render, Res, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from '../prisma/prisma.service';
import type { Response } from 'express';
import { imageMulterOptions, buildPublicUploadPath } from '../upload/upload.config';

@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  private multerConfig = imageMulterOptions;

  // Dashboard
  @Get()
  @Render('admin/dashboard')
  async dashboard() {
    const projects = await this.prisma.project.findMany();
    const configs = await this.prisma.config.findMany();
    
    return {
      title: 'Admin Dashboard',
      projects: projects,
      configs: configs,
    };
  }

  // Projects Management
  @Get('projects')
  @Render('admin/projects')
  async projects() {
    const projects = await this.prisma.project.findMany();
    return {
      title: 'Projects Management',
      projects: projects,
    };
  }

  @Get('projects/new')
  @Render('admin/project-form')
  async newProject() {
    return {
      title: 'New Project',
      project: null,
    };
  }

  @Get('projects/:id/edit')
  @Render('admin/project-form')
  async editProject(@Param('id') id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
    return {
      title: 'Edit Project',
      project: project,
    };
  }

  @Post('projects')
  @UseInterceptors(FileInterceptor('image', imageMulterOptions))
  async createProject(@Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const imageUrl = file ? buildPublicUploadPath(file.filename) : null;
    
    await this.prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        short_description: data.short_description,
        image_url: imageUrl,
        is_feautured: data.is_feautured === 'on',
        stack_name: data.stack_name,
      },
    });
    res.redirect('/admin/projects');
  }

  @Post('projects/:id/update')
  @UseInterceptors(FileInterceptor('image', imageMulterOptions))
  async updateProject(@Param('id') id: string, @Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const updateData: any = {
      title: data.title,
      description: data.description,
      short_description: data.short_description,
      is_feautured: data.is_feautured === 'on',
      stack_name: data.stack_name,
    };

    // Chỉ cập nhật image_url nếu có file mới được upload
    if (file) {
      updateData.image_url = buildPublicUploadPath(file.filename);
    }

    await this.prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.redirect('/admin/projects');
  }

  @Post('projects/:id/delete')
  async deleteProject(@Param('id') id: string, @Res() res: Response) {
    await this.prisma.project.delete({
      where: { id: parseInt(id) },
    });
    res.redirect('/admin/projects');
  }

  // Configs Management
  @Get('configs')
  @Render('admin/configs')
  async configs() {
    const configs = await this.prisma.config.findMany();
    return {
      title: 'Configs Management',
      configs: configs,
    };
  }

  @Get('configs/new')
  @Render('admin/config-form')
  async newConfig() {
    return {
      title: 'New Config',
      config: null,
    };
  }

  @Get('configs/:id/edit')
  @Render('admin/config-form')
  async editConfig(@Param('id') id: string) {
    const config = await this.prisma.config.findUnique({
      where: { id: parseInt(id) },
    });

    return {
      title: 'Edit Config',
      config: config,
    };
  }

  @Post('configs')
  @UseInterceptors(FileInterceptor('value', imageMulterOptions))
  async createConfig(@Req() req: any, @Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {

    // Validate duplicate config_name
    const existingConfig = await this.prisma.config.findUnique({
      where: { config_name: req.body.config_name }
    });
    if (existingConfig) {
      return res.render('admin/config-form', {
        title: 'New Config',
        config: req.body,
        error: 'Config name already exists.'
      });
    }

    // Sử dụng req.body thay vì data parameter
    const safeData: any = req.body || {};
    if (safeData.value_type === 'image' && file) {
      safeData.value = buildPublicUploadPath(file.filename);
    }

    await this.prisma.config.create({
      data: {
        config_name: safeData.config_name || '',
        value: safeData.value || '',
        value_type: safeData.value_type || 'text'
      },
    });
    res.redirect('/admin/configs');
  }

  @Post('configs/:id/update')
  @UseInterceptors(FileInterceptor('value', imageMulterOptions))
  async updateConfig(@Param('id') id: string, @Body() data: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const safeData: any = data || {};
    if (file) {
      safeData.value = buildPublicUploadPath(file.filename);
    }

    await this.prisma.config.update({
      where: { id: parseInt(id) },
      data: {
        config_name: safeData.config_name || '',
        value: safeData.value,
      },
    });
    res.redirect('/admin/configs');
  }

  @Post('configs/:id/delete')
  async deleteConfig(@Param('id') id: string, @Res() res: Response) {
    await this.prisma.config.delete({
      where: { id: parseInt(id) },
    });
    res.redirect('/admin/configs');
  }

}
