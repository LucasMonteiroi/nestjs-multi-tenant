import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-orm/prisma.module';
import { FeaturesRepository } from './features.repository';
import { FeaturesService } from './features.service';

@Module({
    imports: [PrismaModule],
    providers: [FeaturesRepository, FeaturesService],
    exports: [FeaturesService]
})
export class FeaturesModule { }
