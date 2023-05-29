import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({
    abortEarly: false,
});