import { Injectable } from '@nestjs/common';
import { Feature } from '@prisma/client';
import { FeaturesRepository } from './features.repository';

@Injectable()
export class FeaturesService {
    constructor(private repository: FeaturesRepository) { }

    async createFeature(params: { name: Feature[`name`]; planId: Feature[`planId`]; active: Feature[`active`] }) {
        const { name, planId, active } = params;

        const feature = await this.repository.createFeature({
            data: {
                name,
                active,
                plan: {
                    connect: {
                        id: planId
                    }
                }
            },
        });

        return feature;
    }

    async updateFeature(params: { id: Feature[`id`]; name: Feature[`name`]; planId: Feature[`planId`]; active: Feature[`active`] }) {
        const { id, name, planId, active } = params;

        const feature = await this.repository.updateFeature({
            where: {
                id
            },
            data: {
                name,
                active,
                plan: {
                    connect: {
                        id: planId
                    }
                }
            },
        });

        return feature;
    }

    async getFeatures() {
        const features = await this.repository.getFeatures({});

        return features;
    }

    async getFilteredFeatures(searchString: string) {
        const features = await this.repository.getFeatures({
            where: {
                name: { contains: searchString }
            }
        });

        return features;

    }

    async deleteFeature(params: { featureId: Feature['id'] }) {
        const { featureId } = params;
        const deleted = await this.repository.deleteFeature({
            where: {
                id: featureId
            }
        });
        console.log(deleted);
    }
}