import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-orm/prisma.service';
import { Plan, Prisma } from '@prisma/client';

@Injectable()
export class PlansRepository {
    constructor(private prisma: PrismaService){}

    async createPlan(params: {
        data: Prisma.PlanCreateInput
    }): Promise<Plan> {
        const { data } = params;
        return this.prisma.plan.create({ data });
    }

    async getPlans(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PlanWhereUniqueInput;
        where?: Prisma.PlanWhereInput;
        orderBy?: Prisma.PlanOrderByWithRelationInput;
    }): Promise<Plan[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.plan.findMany({ skip, take, cursor, where, orderBy });
    }

    async updatePlan(params: {
        where: Prisma.PlanWhereUniqueInput;
        data: Prisma.PlanUpdateInput;
    }): Promise<Plan> {
        const { where, data } = params;
        return this.prisma.plan.update({ where, data });
    }

    async deletePlan(params: {
        where: Prisma.PlanWhereUniqueInput;
    }): Promise<Plan> {
        const { where } = params;
        return this.prisma.plan.delete({ where });
    }
 }
