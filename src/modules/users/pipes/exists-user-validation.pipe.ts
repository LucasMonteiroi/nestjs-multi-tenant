import { ArgumentMetadata, BadRequestException, forwardRef, Inject, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi";
import { UsersService } from "../services/users.service";

@Injectable()
export class ExistsUserPipe implements PipeTransform {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ) {}

    async transform(value: string) {
        const user = await this.usersService.getUserById(value);

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        Joi.assert(
            user,
            Joi.object({
                id: Joi.string().required(),
            }).unknown(true)
        );

        return user.id;
    }
}