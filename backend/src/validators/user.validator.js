import Joi from "joi";

const registerSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .min(8)
        .max(128)
        .required(),

    organization: Joi.string()
        .required(),

    department: Joi.string()
        .optional(),

    team: Joi.string()
        .optional(),

    role: Joi.string()
        .required(),
});

export {
    registerSchema,
};