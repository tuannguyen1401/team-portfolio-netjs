import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Use 'on' instead of '$on' to avoid type error, or cast to 'any'
    (this as any).$on?.('beforeExit', async () => {
      await app.close();
    });
  }
}
