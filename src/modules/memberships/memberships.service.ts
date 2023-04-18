import { Injectable } from '@nestjs/common';
import { Membership } from '@prisma/client';
import { MembershipsRepository } from './memberships.repository';

@Injectable()
export class MembershipsService {
    constructor(private repository: MembershipsRepository) { }

    async createMembership(
        params: { 
            userId: Membership[`userId`]; 
            planId: Membership[`planId`];
        }
    ) {
        const { 
            userId, 
            planId 
        } = params;

        const membership = await this.repository.createMembership({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                plan: {
                    connect: {
                        id: planId
                    }
                }
            },
        });

        return membership;
    }

    async updateMembership(
        params: { 
            id: Membership[`id`];
            userId: Membership[`userId`]; 
            planId: Membership[`planId`];
        }
    ) {
        const { 
            id,
            userId, 
            planId 
        } = params;

        const membership = await this.repository.updateMembership({
            where: {
                id
            },
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                plan: {
                    connect: {
                        id: planId
                    }
                }
            },
        });

        return membership;
    }

    async getMemberships() {
        const memberships = await this.repository.getMemberships({});

        return memberships;
    }

    async getFilteredMemberships(searchString: string) {
        const memberships = await this.repository.getMemberships({
            where: {
                OR: [
                    {
                        user: {
                            name: { contains: searchString}
                        }
                    },
                    {
                        plan: {
                            name: { contains: searchString }
                        }
                    }
                ]
            }
        });

        return memberships;

    }

    async deleteMembership(params: { membershipId: Membership['id'] }) {
        const { membershipId } = params;
        const deleted = await this.repository.deleteMembership({
            where: {
                id: membershipId
            }
        });
        console.log(deleted);
    }
}