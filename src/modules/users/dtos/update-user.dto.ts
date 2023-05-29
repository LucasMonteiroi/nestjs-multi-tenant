import { Role } from "@prisma/client";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends CreateUserDto {
    id: string;
    active: boolean;
    role: Role;
}