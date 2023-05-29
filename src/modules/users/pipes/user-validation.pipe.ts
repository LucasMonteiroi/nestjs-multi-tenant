import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class UserValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: CreateUserDto) {
        const result = this.schema.validate(value);

        if(result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }

        return value;
    }

}