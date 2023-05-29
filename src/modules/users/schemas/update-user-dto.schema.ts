import { Role } from '@prisma/client';
import * as Joi from 'joi';

export const UpdateUserSchema = Joi.object({
    id: Joi.string,
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    active: Joi.boolean().truthy().required(),
    role: Joi.string().valid(...Object.values(Role)).required(),
}).options({
    abortEarly: false,
});
