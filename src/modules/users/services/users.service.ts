import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt'

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
    constructor(private repository: UsersRepository) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const {
            name,
            username,
            email,
            password,
        } = createUserDto;

        const userExists = await this.repository.getByParam({
            where: {
                username
            }
        })

        if (userExists) {
            throw new BadRequestException('User with this username already exists')
        }

        const hashedPassword = await bcrypt.hash(
            password,
            roundsOfHashing,
        );

        const user = await this.repository.createUser({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                active: true,
                role: Role.USER
            },
        });

        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const {
            name,
            email,
            password,
            active,
            role
        } = updateUserDto;

        const user = await this.repository.updateUser({
            where: {
                id
            },
            data: {
                name,
                email,
                password: password ? await bcrypt.hash(password, roundsOfHashing,) : password,
                active,
                role
            },
        });

        delete user.password;

        return user;
    }

    async getUsers() {
        const users = await this.repository.getUsers({});

        return users;
    }

    async getUserById(id: string) {
        const user = await this.repository.getUser({
            where: {
                id
            }
        });

        return user;
    }

    async getUserByUsername(username: string) {
        return await this.repository.getByParam({
            where: {
                username
            }
        })
    }

    async getFilteredUsers(searchString: string) {
        const users = await this.repository.getUsers({
            where: {
                name: { contains: searchString }
            }
        });

        return users;

    }

    async deleteUser(id: string) {
        const deleted = await this.repository.deleteUser({
            where: {
                id
            }
        });
    }
}