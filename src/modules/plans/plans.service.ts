import { Injectable } from '@nestjs/common';
import { Plan } from '@prisma/client';
import { PlansRepository } from './plans.repository';

@Injectable()
export class PlansService {
    constructor(private repository: PlansRepository) { }

    async createPlan(
        params: { 
            name: Plan[`name`]; 
            period: Plan[`period`];
            price: Plan[`price`];
            maxRequests: Plan[`maxRequests`]; 
            active: Plan[`active`] 
        }
    ) {
        const { 
            name,
            period,
            price,
            maxRequests, 
            active 
        } = params;

        const plan = await this.repository.createPlan({
            data: {
                name,
                period,
                price,
                maxRequests, 
                active 
            },
        });

        return plan;
    }

    async updatePlan(
        params: { 
            name: Plan[`name`]; 
            period: Plan[`period`];
            price: Plan[`price`];
            maxRequests: Plan[`maxRequests`]; 
            active: Plan[`active`],
            planId: Plan[`id`]
        }
    ) {
        const { 
            name,
            period,
            price,
            maxRequests, 
            active,
            planId
        } = params;

        const plan = await this.repository.updatePlan({
            where: {
                id: planId
            },
            data: {
                name,
                period,
                price,
                maxRequests, 
                active,
            },
        });

        return plan;
    }

    async getPlans() {
        const plans = await this.repository.getPlans({});

        return plans;
    }

    async getFilteredPlans(searchString: string) {
        const plans = await this.repository.getPlans({
            where: {
                name: { contains: searchString }
            }
        });

        return plans;

    }

    async deletePlan(params: { planId: Plan['id'] }) {
        const { planId } = params;
        const deleted = await this.repository.deletePlan({
            where: {
                id: planId
            }
        });
        console.log(deleted);
    }
}