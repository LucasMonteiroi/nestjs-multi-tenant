import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { ExistsUserPipe } from "../pipes/exists-user-validation.pipe";
import { UserValidationPipe } from "../pipes/user-validation.pipe";
import { CreateUserSchema } from "../schemas/create-user-dto.schema";
import { UpdateUserSchema } from "../schemas/update-user-dto.schema";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UsePipes(new UserValidationPipe(CreateUserSchema))
    async create(@Body() data: CreateUserDto) {
        return await this.usersService.createUser(data);
    }

    @Put(':id')
    async update(
        @Param('id', ExistsUserPipe) id: string,
        @Body(new UserValidationPipe(UpdateUserSchema)) data: UpdateUserDto
    ) {
        return await this.usersService.updateUser(id, data)
    }

    @Get()
    async getAll() {
        return await this.usersService.getUsers();
    }

    @Get(':id')
    async GetById(
        @Param('id', ExistsUserPipe) id: string
    ) {
        return await this.usersService.getUserById(id);
    }

    @Delete(':id')
    async Delete(
        @Param('id', ExistsUserPipe) id: string
    ) {
        return await this.usersService.deleteUser(id)
    }

}