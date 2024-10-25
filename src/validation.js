//Joi library is used to describe data. In this case is used to validate it.
import Joi from 'joi'

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(data)
}

export { registerValidation, loginValidation };