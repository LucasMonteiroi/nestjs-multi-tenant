import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-orm/prisma.module';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
    imports: [PrismaModule],
    providers: [TasksRepository, TasksService],
    exports: [TasksService]
})
export class TasksModule {}
