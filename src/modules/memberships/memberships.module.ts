import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-orm/prisma.module';
import { MembershipsRepository } from './memberships.repository';
import { MembershipsService } from './memberships.service';

@Module({
    imports: [PrismaModule],
    providers: [MembershipsRepository, MembershipsService],
    exports: [MembershipsService]
})
export class MembershipsModule { }
