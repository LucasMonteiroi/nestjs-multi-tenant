import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-orm/prisma.service';
import { Feature, Prisma } from '@prisma/client';

@Injectable()
export class FeaturesRepository {
    constructor(private prisma: PrismaService){}

    async createFeature(params: {
        data: Prisma.FeatureCreateInput
    }): Promise<Feature> {
        const { data } = params;
        return this.prisma.feature.create({ data });
    }

    async getFeatures(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.FeatureWhereUniqueInput;
        where?: Prisma.FeatureWhereInput;
        orderBy?: Prisma.FeatureOrderByWithRelationInput;
    }): Promise<Feature[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.feature.findMany({ skip, take, cursor, where, orderBy });
    }

    async updateFeature(params: {
        where: Prisma.FeatureWhereUniqueInput;
        data: Prisma.FeatureUpdateInput;
    }): Promise<Feature> {
        const { where, data } = params;
        return this.prisma.feature.update({ where, data });
    }

    async deleteFeature(params: {
        where: Prisma.FeatureWhereUniqueInput;
    }): Promise<Feature> {
        const { where } = params;
        return this.prisma.feature.delete({ where });
    }
 }
