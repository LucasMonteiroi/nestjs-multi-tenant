import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private repository: UsersRepository) { }

    async createUser(
        params: {
            name: User[`name`];
            username: User[`username`];
            email: User[`email`];
            password: User[`password`];
            active: User[`active`];
            role: User[`role`]
        }) {
        const {
            name,
            username,
            email,
            password,
            active,
            role
        } = params;

        const user = await this.repository.createUser({
            data: {
                name,
                username,
                email,
                password,
                active,
                role
            },
        });

        return user;
    }

    async updateUser(params: {
        id: User[`id`];
        name: User[`name`];
        email: User[`email`];
        password: User[`password`];
        active: User[`active`];
        role: User[`role`]
    }) {
    const {
        id,
        name,
        email,
        password,
        active,
        role
    } = params;

        const user = await this.repository.updateUser({
            where: {
                id
            },
            data: {
                name,
                email,
                password,
                active,
                role
            },
        });

        return user;
    }

    async getUsers() {
        const users = await this.repository.getUsers({});

        return users;
    }

    async getFilteredUsers(searchString: string) {
        const users = await this.repository.getUsers({
            where: {
                name: { contains: searchString }
            }
        });

        return users;

    }

    async deleteUser(params: { userId: User['id'] }) {
        const { userId } = params;
        const deleted = await this.repository.deleteUser({
            where: {
                id: userId
            }
        });
        console.log(deleted);
    }
}