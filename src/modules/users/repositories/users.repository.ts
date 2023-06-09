import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-orm/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService){}

    async createUser(params: {
        data: Prisma.UserCreateInput
    }): Promise<User> {
        const { data } = params;
        return this.prisma.user.create({ data });
    }

    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        include?: Prisma.UserInclude;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.user.findMany({ skip, take, cursor, where, orderBy, include });
    }

    async getUser(params: {
        include?: Prisma.UserInclude;
        where?: Prisma.UserWhereUniqueInput;
    }): Promise<User> {
        const { include, where } = params;
        return this.prisma.user.findUnique({ where, include });
    }

    async getByParam(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        include?: Prisma.UserInclude;
    }) {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.user.findFirst({ skip, take, cursor, where, orderBy, include });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({ where, data });
    }

    async deleteUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User> {
        const { where } = params;
        return this.prisma.user.delete({ where });
    }
 }
