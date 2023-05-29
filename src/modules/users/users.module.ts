import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-orm/prisma.module';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [PrismaModule],
    providers: [UsersRepository, UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
