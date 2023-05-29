import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@prisma-orm/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add Global Prefix
  app.setGlobalPrefix('api/v1');
  
  // Prisma configs
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
