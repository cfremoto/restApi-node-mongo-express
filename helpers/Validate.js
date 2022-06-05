const Joi = require('joi');

const schema = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(4).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().required()

})

const cursoSchema = Joi.object({
    titulo: Joi.string().max(30).required(),
    descripcion: Joi.string().max(200).required(),
})

module.exports = {
    schema,
    cursoSchema,
}
