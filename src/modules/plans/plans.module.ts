import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-orm/prisma.module';
import { PlansRepository } from './plans.repository';
import { PlansService } from './plans.service';

@Module({
    imports: [PrismaModule],
    providers: [PlansRepository, PlansService],
    exports: [PlansService]
})
export class PlansModule { }
