import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
    const passwordEthan = await bcrypt.hash('password-ethan', roundsOfHashing);
    const passwordSarah = await bcrypt.hash('password-sarah', roundsOfHashing);

    const ethan = await prisma.user.upsert({
        where: { username: 'ethan.jones'},
        update: {},
        create: {
            name: 'Ethan Jones',
            email: 'ethan@tenant.com',
            username: 'ethan.jones',
            password: passwordEthan,
            active: true,
            role: Role.USER,
        },
    });

    const sarah = await prisma.user.upsert({
        where: { username: 'sarah.flentcher'},
        update: {},
        create: {
            name: 'Sarah Flentcher',
            email: 'sarah@tenant.com',
            username: 'sarah.jones',
            password: passwordSarah,
            active: true,
            role: Role.USER,
        },
    });

    const freePlan = await prisma.plan.upsert({
        where: { id: uuid() },
        update: {},
        create: {
            name: 'Free',
            period: 7,
            price: 0,
            active: true,
            features: {},
            Membership: {},
            maxRequests: 10
        }
    });

    const basicPlan = await prisma.plan.upsert({
        where: { id: uuid() },
        update: {},
        create: {
            name: 'Basic',
            period: 30,
            price: 0,
            active: true,
            features: {},
            Membership: {},
            maxRequests: 1000
        }
    });

    const uploadFileFeature = await prisma.feature.upsert({
        where: { id: uuid() },
        update: {},
        create: {
            name: 'upload-file',
            active: true,
            planId: basicPlan.id
        }
    });

    const sarahMembership = await prisma.membership.upsert({
        where: { id: uuid() },
        update: {},
        create: {
            planId: freePlan.id,
            userId: sarah.id,
        }
    });

    const ethanMembership = await prisma.membership.upsert({
        where: { id: uuid() },
        update: {},
        create: {
            planId: basicPlan.id,
            userId: ethan.id
        }
    });

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })