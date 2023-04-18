import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-orm/prisma.service';
import { Membership, Prisma } from '@prisma/client';

@Injectable()
export class MembershipsRepository {
    constructor(private prisma: PrismaService){}

    async createMembership(params: {
        data: Prisma.MembershipCreateInput
    }): Promise<Membership> {
        const { data } = params;
        return this.prisma.membership.create({ data });
    }

    async getMemberships(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MembershipWhereUniqueInput;
        where?: Prisma.MembershipWhereInput;
        orderBy?: Prisma.MembershipOrderByWithRelationInput;
    }): Promise<Membership[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.membership.findMany({ skip, take, cursor, where, orderBy });
    }

    async updateMembership(params: {
        where: Prisma.MembershipWhereUniqueInput;
        data: Prisma.MembershipUpdateInput;
    }): Promise<Membership> {
        const { where, data } = params;
        return this.prisma.membership.update({ where, data });
    }

    async deleteMembership(params: {
        where: Prisma.MembershipWhereUniqueInput;
    }): Promise<Membership> {
        const { where } = params;
        return this.prisma.membership.delete({ where });
    }
 }
