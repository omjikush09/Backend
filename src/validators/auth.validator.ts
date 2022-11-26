import Joi from "joi";

const registerUserSchema=Joi.object({
    email:Joi.string().email().lowercase().required(),
    first_name:Joi.string().max(30).required(),
    last_name:Joi.string().max(30),
    password:Joi.string().required(),
    age:Joi.number().integer().min(0).max(200),
    city:Joi.string().max(100)
})


const loginSchema=Joi.object({
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().required(),
})


export {registerUserSchema,loginSchema};